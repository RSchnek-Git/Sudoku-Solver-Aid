//------------------------DEFINITIONS----------------------
const digits = '123456789'
const rows = 'ABCDEFGHI'
const cols = digits
const diagonalRows = ['ABC', 'DEF', 'GHI']
const diagonalCols = ['123', '456', '789']
const squares = cross(rows, cols)

//identifies all possible groupings, either by row, column, or square
let unitlist = []
for (let c = 0; c < cols.length; c++) {
  unitlist.push(cross(rows, cols[c]))
}
for (let r = 0; r < rows.length; r++) {
  unitlist.push(cross(rows[r], cols))
}
for (let rs = 0; rs < diagonalRows.length; rs++) {
  for (let cs = 0; cs < diagonalCols.length; cs++) {
    unitlist.push(cross(diagonalRows[rs], diagonalCols[cs]))
  }
}

//`${units} creates all of the "groups" that a given cell belongs to, including the cell
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
let units = {}
for (let s = 0; s < squares.length; s++) {
  for (let u = 0; u < unitlist.length; u++) {
    if (unitlist[u].includes(squares[s]) && !units[squares[s]]) {
      units[squares[s]] = [unitlist[u]]
    } else if (unitlist[u].includes(squares[s])) {
      units[squares[s]].push(unitlist[u])
    }
  }
}

//`${peers} identifies all of the cells that will interact with a given cell, mainly:
//peers['I8'] = [
//   'A8', 'B8', 'C8', 'D8',
//   'E8', 'F8', 'G8', 'H8',
//   'I1', 'I2', 'I3', 'I4',
//   'I5', 'I6', 'I7', 'I9',
//   'G7', 'G8', 'G9', 'H7',
//   'H8', 'H9', 'I7', 'I9'
//]
let peers = {}
for (let cell in units) {
  if (units.hasOwnProperty(cell)) {
    for (let i = 0; i < units[cell].length; i++) {
      if (!peers[cell]) {
        peers[cell] = units[cell][i].filter(
          innerArray => innerArray !== `${cell}`
        )
      } else {
        peers[cell].push(
          ...units[cell][i].filter(innerArray => innerArray !== `${cell}`)
        )
      }
    }
  }
}

//--------------------------FUNCTIONS----------------------
function cross(N, M) {
  //computes the cross product of elements in n and in m
  let resArr = []
  for (let i = 0; i < N.length; i++) {
    for (let j = 0; j < M.length; j++) {
      resArr.push(N[i] + M[j])
    }
  }
  return resArr
}

export const gridValues = grid => {
  //convert grid into a dict of {square: char} with '0' or ' ' for empty cells
  //grid will be an object of objects
  let puzzle = {}
  for (const cell in grid) {
    if (grid.hasOwnProperty(cell)) {
      if (grid[cell] === '') {
        puzzle[cell] = '.'
      } else {
        puzzle[cell] = grid[cell]
      }
    }
  }
  console.log('CHARS:', puzzle)
  return puzzle
}

export function parseGrid(grid) {
  //convert grid to an object {square: digits} where digits are all possible values that are able to be placed in that square, or return False if there's a contradiction detected
  let values = {}
  for (let s = 0; s < squares.length; s++) {
    values[squares[s]] = digits
  }
  for (let dictKeys in gridValues(grid)) {
    if (gridValues(grid).hasOwnProperty(dictKeys)) {
      if (
        digits.includes(gridValues(grid).dictKeys) &&
        !assign(values, dictKeys, gridValues(grid).dictKeys)
      ) {
        return false
      }
    }
  }
  return values
}

function assign(values, cells, possibles) {
  const otherValues = values[cells].replace(possibles, '')
  for (const key in otherValues) {
    if (otherValues.hasOwnProperty(key)) {
      if (otherValues.every(eliminate(values, cells, otherValues[key]))) {
        return values
      } else {
        return false
      }
    }
  }
}

function eliminate(values, cells, possibles) {
  //s = cells, d = possibles
  // Eliminate d from values[s]; propagate when values or places <= 2.
  // Return values, except return False if a contradiction is detected.
  if (!values[cells].includes(possibles)) return values //Already eliminated
  values[cells] = values[cells].replace(possibles, '')
  // (1) If a square "cells" is reduced to one value "possibles,"" then eliminate "possibles" from the peers.
  if (values[cells].length === 0) return false
  else if (values[cells].length === 1) {
    //Contradiction: removed last value
    let newPossibles = values[cells]
    for (let newCells = 0; newCells < peers[cells].length; newCells++) {
      if (!newPossibles.every(eliminate(values, newCells, newPossibles)))
        return false
    }
  }
  // //(2) If a unit u is reduced to only one place for a value d, then put it there.
  // for (let u = 0; u < units[cells].length; u++){
  //     for(let s = 0; s < u.length; s++){
  //         if(values[cells].includes(possibles)){
  //             dplaces
  //         }
  //     }
  // }
  // dplaces = [s for s in u if d in values[s]]
  // if len(dplaces) == 0:
  //     return false // Contradiction: no place for this value
  // elif len(dplaces) == 1:
  //     # d can only be in one place in unit; assign it there
  //         if not assign(values, dplaces[0], d):
  //             return False
  // return values
}
