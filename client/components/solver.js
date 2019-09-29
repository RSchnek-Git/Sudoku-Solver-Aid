import React, {Component} from 'react'
import {gotPuzzleThunk} from '../store/puzzle'
import {connect} from 'react-redux'

const emptyBoard = {
  A1: '',
  A2: '',
  A3: '',
  A4: '',
  A5: '',
  A6: '',
  A7: '',
  A8: '',
  A9: '',
  B1: '',
  B2: '',
  B3: '',
  B4: '',
  B5: '',
  B6: '',
  B7: '',
  B8: '',
  B9: '',
  C1: '',
  C2: '',
  C3: '',
  C4: '',
  C5: '',
  C6: '',
  C7: '',
  C8: '',
  C9: '',
  D1: '',
  D2: '',
  D3: '',
  D4: '',
  D5: '',
  D6: '',
  D7: '',
  D8: '',
  D9: '',
  E1: '',
  E2: '',
  E3: '',
  E4: '',
  E5: '',
  E6: '',
  E7: '',
  E8: '',
  E9: '',
  F1: '',
  F2: '',
  F3: '',
  F4: '',
  F5: '',
  F6: '',
  F7: '',
  F8: '',
  F9: '',
  G1: '',
  G2: '',
  G3: '',
  G4: '',
  G5: '',
  G6: '',
  G7: '',
  G8: '',
  G9: '',
  H1: '',
  H2: '',
  H3: '',
  H4: '',
  H5: '',
  H6: '',
  H7: '',
  H8: '',
  H9: '',
  I1: '',
  I2: '',
  I3: '',
  I4: '',
  I5: '',
  I6: '',
  I7: '',
  I8: '',
  I9: ''
}

class SolvePage extends Component {
  constructor(props) {
    super(props)
    this.state = emptyBoard
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(evt) {
    event.preventDefault()
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleClick() {
    event.preventDefault()
    this.props.gotPuzzle(this.state)
    // this.props.history.push('/wowfactor')
  }

  gridMaker = () => {
    const rows = 'ABCDEFGHI'
    const cols = '123456789'
    let returnArr = []
    for (let r = 0; r < rows.length; r++) {
      let rowArr = []
      for (let c = 0; c < cols.length; c++) {
        rowArr.push(rows[r] + cols[c])
      }
      returnArr.push(rowArr)
    }
    return returnArr
  }

  render() {
    const grid = this.gridMaker()
    return (
      <div id="screen">
        <div id="game">
          <table id="grid" border="1">
            <tbody>
              {grid.map((row, r) => {
                return (
                  <tr className="row" key={row[r][0]}>
                    {row.map(cell => {
                      return (
                        <td className="cell" key={cell}>
                          {' '}
                          <input
                            type="text"
                            name={cell}
                            value={this.state.cell}
                            maxLength="1"
                            onChange={this.handleChange}
                          />
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="btn">
            <button type="button" onClick={this.handleClick}>
              Solve
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  gotPuzzle: puzzle => {
    dispatch(gotPuzzleThunk(puzzle))
  }
})

const Solver = connect(null, mapDispatchToProps)(SolvePage)
export default Solver
// 003020600
// 900305001
// 001806400
// 008102900
// 700000008
// 006708200
// 002609500
// 800203009
// 005010300
