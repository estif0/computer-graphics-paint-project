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
