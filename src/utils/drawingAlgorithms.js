// Digital Differential Analyzer (DDA) for line drawing
export const drawLineDDA = (ctx, x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
  
  if (steps === 0) return;
  
  const xIncrement = dx / steps;
  const yIncrement = dy / steps;
  
  let x = x1;
  let y = y1;
  
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  
  for (let i = 0; i <= steps; i++) {
    ctx.lineTo(x, y);
    x += xIncrement;
    y += yIncrement;
  }
  
  ctx.stroke();
};

// Bresenham's Line Algorithm
export const drawLineBresenham = (ctx, x1, y1, x2, y2) => {
  let x = x1;
  let y = y1;
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;
  
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  
  while (true) {
    ctx.lineTo(x, y);
    
    if (x === x2 && y === y2) break;
    
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
  
  ctx.stroke();
};

// Midpoint Circle Algorithm
export const drawCircle = (ctx, centerX, centerY, radius) => {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();
};

// Rectangle drawing
export const drawRectangle = (ctx, x1, y1, x2, y2) => {
  const width = x2 - x1;
  const height = y2 - y1;
  
  ctx.beginPath();
  ctx.rect(x1, y1, width, height);
  ctx.stroke();
};

// Triangle drawing
export const drawTriangle = (ctx, x1, y1, x2, y2) => {
  const baseX = x2;
  const baseY = y2;
  const thirdX = x1 - (x2 - x1); // Make an isosceles triangle
  
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(baseX, baseY);
  ctx.lineTo(thirdX, baseY);
  ctx.closePath();
  ctx.stroke();
};