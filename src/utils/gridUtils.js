export const drawGrid = (ctx, width, height, gridSize) => {
  const originalStyle = ctx.strokeStyle;
  const originalWidth = ctx.lineWidth;
  
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 1;
  
  // Draw vertical lines
  for (let x = gridSize; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  
  // Draw horizontal lines
  for (let y = gridSize; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  
  // Restore original context settings
  ctx.strokeStyle = originalStyle;
  ctx.lineWidth = originalWidth;
};