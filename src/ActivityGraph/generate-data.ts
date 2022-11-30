interface GenerateActivityGraphDataParams {
  width: number;
  height: number;
  tileSize: number;
}

export function generateActivityGraphData({
  width,
  height,
  tileSize,
}: GenerateActivityGraphDataParams) {
  const rows = Math.floor(height / tileSize);
  const cols = Math.floor(width / tileSize);

  const data: number[][] = [];
  for (let row = 0; row < rows; ++row) {
    data[row] = [];
    for (let col = 0; col < cols; ++col) {
      data[row][col] = Math.random();
    }
  }
  return data;
}
