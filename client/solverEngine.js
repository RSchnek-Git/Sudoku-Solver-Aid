export const gridMaker = () => {
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

export default gridMaker
