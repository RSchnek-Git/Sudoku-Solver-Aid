import React, {Component} from 'react'
import gridMaker from '../solverEngine'
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

export class Solver extends Component {
  constructor() {
    super()
    this.state = emptyBoard
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    event.preventDefault()
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit() {
    event.preventDefault()
    this.props.gotPuzzleThunk(this.state)
    this.setState(emptyBoard)
  }

  render() {
    const grid = gridMaker()
    console.log(grid)
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
            <button type="submit">Solve</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  gotPuzzleThunk: puzzle => dispatch(gotPuzzleThunk(puzzle))
})

export default connect(null, mapDispatchToProps)(Solver)
