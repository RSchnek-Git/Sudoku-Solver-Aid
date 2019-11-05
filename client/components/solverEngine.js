import React, {Component} from 'react'
import {connect} from 'react-redux'

class EngineSolver extends Component {
  constructor(props) {
    super(props)
    this.puzzle = this.props.puzzle
    this.finalPuzzle = []
    this.rows = 'ABCDEFGHI'
    this.cols = '123456789'
    this.diagonalRows = ['ABC', 'DEF', 'GHI']
    this.diagonalCols = ['123', '456', '789']
    this.squares = this.cross(this.rows, this.cols)
    this.unitlist = []
    this.units = {}
    this.peers = {}
    this.possibles = {}
    this.isSolved = false
    this.state = {
      isLoaded: false
    }
  }

  cross(N, M) {
    //computes the cross product of elements in n and in m
    //used to make ${squares}
    let resArr = []
    for (let i = 0; i < N.length; i++) {
      for (let j = 0; j < M.length; j++) {
        resArr.push(N[i] + M[j])
      }
    }
    return resArr
  }

  //createUnitList() identifies all possible groupings, either by row, column, or square
  //support for ${peers} creation
  createUnitList() {
    for (let c = 0; c < this.cols.length; c++) {
      this.unitlist.push(this.cross(this.rows, this.cols[c]))
    }
    for (let r = 0; r < this.rows.length; r++) {
      this.unitlist.push(this.cross(this.rows[r], this.cols))
    }
    for (let rs = 0; rs < this.diagonalRows.length; rs++) {
      for (let cs = 0; cs < this.diagonalCols.length; cs++) {
        this.unitlist.push(
          this.cross(this.diagonalRows[rs], this.diagonalCols[cs])
        )
      }
    }
  }

  //createUnits() creates all of the "groups" that a given cell belongs to, including the cell
  //support for ${peers} creation
  //ie. units['H8'] = H8: [
  // [
  //     'A8', 'B8', 'C8',
  //     'D8', 'E8', 'F8',
  //     'G8', 'H8', 'I8'
  //   ],
  //   [
  //     'H1', 'H2', 'H3',
  //     'H4', 'H5', 'H6',
  //     'H7', 'H8', 'H9'
  //   ],
  //   [
  //     'G7', 'G8', 'G9',
  //     'H7', 'H8', 'H9',
  //     'I7', 'I8', 'I9'
  //   ]
  // ]
  createUnits() {
    for (let s = 0; s < this.squares.length; s++) {
      for (let u = 0; u < this.unitlist.length; u++) {
        if (
          this.unitlist[u].includes(this.squares[s]) &&
          !this.units[this.squares[s]]
        ) {
          this.units[this.squares[s]] = [this.unitlist[u]]
        } else if (this.unitlist[u].includes(this.squares[s])) {
          this.units[this.squares[s]].push(this.unitlist[u])
        }
      }
    }
  }

  //createPeers() identifies all of the cells that will interact with a given cell, mainly:
  //peers['I8'] = [
  //   'A8', 'B8', 'C8', 'D8',
  //   'E8', 'F8', 'G8', 'H8',
  //   'I1', 'I2', 'I3', 'I4',
  //   'I5', 'I6', 'I7', 'I9',
  //   'G7', 'G8', 'G9', 'H7',
  //   'H8', 'H9', 'I7', 'I9'
  //]
  createPeers() {
    for (let cell in this.units) {
      if (this.units.hasOwnProperty(cell)) {
        for (let i = 0; i < this.units[cell].length; i++) {
          if (!this.peers[cell]) {
            this.peers[cell] = this.units[cell][i].filter(
              peer => peer !== `${cell}`
            )
          } else {
            this.peers[cell].push(
              ...this.units[cell][i].filter(
                peer => peer !== `${cell}` && !this.peers[cell].includes(peer)
              )
            )
          }
        }
      }
    }
  }

  createPossibles() {
    const puzzle = this.puzzle
    for (const cell in puzzle) {
      if (puzzle.hasOwnProperty(cell)) {
        this.possibles[cell] = this.cols
        for (let peer = 0; peer < this.peers[cell].length; peer++) {
          if (puzzle[cell] == '0') {
            this.possibles[cell] = this.possibles[cell].replace(
              puzzle[this.peers[cell][peer]],
              ''
            )
          } else {
            this.possibles[cell] = ''
          }
        }
      }
    }
  }

  parseGridAndAssign() {
    while (!this.isSolved) {
      for (const cell in this.puzzle) {
        if (
          this.puzzle.hasOwnProperty(cell) &&
          this.possibles[cell].length === 1
        ) {
          this.puzzle[cell] = this.possibles[cell][0]
        }
      }
      for (const cell in this.puzzle) {
        if (this.possibles[cell].length > 0) {
          this.createPossibles()
        }
      }
      this.isSolved = true
    }
    this.gridCreator()
  }

  zeroConverter() {
    for (const cell in this.puzzle) {
      if (this.puzzle.hasOwnProperty(cell)) {
        if (this.puzzle[cell] === '') {
          this.puzzle[cell] = '0'
        }
      }
    }
  }

  gridCreator(){
    for (let r = 0; r < this.rows.length; r++){
      let gridRow = []
      for (let c = 0; c < this.cols.length; c++){
        gridRow.push(this.puzzle[this.rows[r]+this.cols[c]])
      }
      this.finalPuzzle.push(gridRow)
    }
    this.setState({
      isLoaded: true
    })
  }

  componentDidMount() {
    this.createUnitList()
    this.createUnits()
    this.createPeers()
    this.zeroConverter()
    this.createPossibles()
    this.parseGridAndAssign()
  }

  render() {
    return (
      this.state.isLoaded ? (
      <div className="screen">
      <div className="game">
        <table className="grid" border="1">
          <tbody>
            {this.finalPuzzle.map((row, r) => {
              return (
                <tr className="row" key={r}>
                  {row.map((cell, c) => {
                    return (
                      <td className="cell" key={r+c}>
                        <input  
                          type="text"
                          defaultValue={this.finalPuzzle[r][c]}
                          maxLength="1"
                          >
                        </input>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
      ) : (
        <div>
          <p>Loading . . .</p>
        </div>
      )
    )
  }
}

const mapStateToProps = state => ({
  puzzle: state.puzzle.currentPuzzle
})

const mapDispatchToProps = dispatch => ({
  gotPuzzle: puzzle => {
    dispatch(gotPuzzleThunk(puzzle))
  }
})

const Engine = connect(mapStateToProps, mapDispatchToProps)(EngineSolver)
export default Engine
