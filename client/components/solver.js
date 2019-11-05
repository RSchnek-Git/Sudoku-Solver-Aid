import React, {Component} from 'react'
import {gotPuzzleThunk} from '../store/puzzle'
import {connect} from 'react-redux'

class SolvePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleLoadClick = this.handleLoadClick.bind(this)
  }

  handleLoadClick() {
    event.preventDefault()
    this.setState({
      A1: '',
      A2: '2',
      A3: '3',
      A4: '4',
      A5: '5',
      A6: '6',
      A7: '7',
      A8: '8',
      A9: '9',
      B1: '4',
      B2: '',
      B3: '8',
      B4: '7',
      B5: '1',
      B6: '2',
      B7: '3',
      B8: '5',
      B9: '6',
      C1: '5',
      C2: '7',
      C3: '6',
      C4: '', 
      C5: '9',
      C6: '8',
      C7: '',
      C8: '2',
      C9: '1',
      D1: '6',
      D2: '', 
      D3: '2',
      D4: '5',
      D5: '3',
      D6: '',
      D7: '9',
      D8: '7',
      D9: '8',
      E1: '', 
      E2: '3',
      E3: '5',
      E4: '8',
      E5: '2',
      E6: '9',
      E7: '6',
      E8: '1',
      E9: '', 
      F1: '8',
      F2: '4',
      F3: '9',
      F4: '6',
      F5: '7',
      F6: '1',
      F7: '2',
      F8: '',
      F9: '5',
      G1: '9',
      G2: '5',
      G3: '1',
      G4: '2',
      G5: '',
      G6: '7',
      G7: '8',
      G8: '6',
      G9: '3',
      H1: '2',
      H2: '6',
      H3: '4',
      H4: '1',
      H5: '8',
      H6: '3',
      H7: '',
      H8: '9',
      H9: '7',
      I1: '3',
      I2: '8',
      I3: '7',
      I4: '9',
      I5: '6',
      I6: '5',
      I7: '1',
      I8: '4',
      I9: '' 
    })
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
    this.props.history.push('/engine')
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
      <div className="screen">
        <div className="game">
          <table className="grid" border="1">
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
                            value={this.state[cell]}
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
          <div className="btn">
            <button type="button" onClick={this.handleLoadClick}>
              Load Default
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
