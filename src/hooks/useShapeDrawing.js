import { useState } from 'react';
import { drawCircle, drawRectangle, drawTriangle } from '../utils/drawingAlgorithms';

export const useShapeDrawing = (contextRef) => {
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [isDrawingShape, setIsDrawingShape] = useState(false);

  const startShape = (x, y) => {
    setStartPoint({ x, y });
    setIsDrawingShape(true);
  };

  const drawShape = (tool, endX, endY) => {
    const ctx = contextRef.current;
    if (!ctx) return;

    switch (tool) {
      case 'circle':
        const radius = Math.sqrt(
          Math.pow(endX - startPoint.x, 2) + Math.pow(endY - startPoint.y, 2)
        );
        drawCircle(ctx, startPoint.x, startPoint.y, radius);
        break;

      case 'rectangle':
        drawRectangle(ctx, startPoint.x, startPoint.y, endX, endY);
        break;

      case 'triangle':
        drawTriangle(ctx, startPoint.x, startPoint.y, endX, endY);
        break;
    }
  };

  const finishShape = () => {
    setIsDrawingShape(false);
  };

  return {
    startShape,
    drawShape,
    finishShape,
    isDrawingShape,
  };
};