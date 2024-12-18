import { useRef, useState, useEffect } from "react";
import { useDrawingContext } from "../contexts/DrawingContext";
import { useShapeDrawing } from "../hooks/useShapeDrawing";
import { drawLineDDA } from "../utils/drawingAlgorithms";
import { drawGrid } from "../utils/gridUtils";

const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  const {
    currentTool,
    strokeColor,
    strokeWidth,
    canvasHistory,
    setCanvasHistory,
    historyIndex,
    setHistoryIndex,
    showGrid,
    gridSize,
  } = useDrawingContext();

  const { startShape, drawShape, finishShape, isDrawingShape } =
    useShapeDrawing(contextRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1920;
    canvas.height = 1080;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeWidth;
    contextRef.current = context;

    // Set initial white background
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    saveToHistory();
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = strokeColor;
      contextRef.current.lineWidth = strokeWidth;
    }
  }, [strokeColor, strokeWidth]);

  useEffect(() => {
    if (contextRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = contextRef.current;

      // Redraw the current state
      if (canvasHistory.length > 0) {
        const img = new Image();
        img.src = canvasHistory[historyIndex];
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          // Draw grid on top if enabled
          if (showGrid) {
            drawGrid(ctx, canvas.width, canvas.height, gridSize);
          }
        };
      } else if (showGrid) {
        drawGrid(ctx, canvas.width, canvas.height, gridSize);
      }
    }
  }, [showGrid, gridSize]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    const newHistory = [...canvasHistory.slice(0, historyIndex + 1)];
    newHistory.push(canvas.toDataURL());

    if (newHistory.length > 20) {
      newHistory.shift();
    }

    setCanvasHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const getTransformedPoint = (x, y) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    return {
      x: (x - rect.left) * scaleX,
      y: (y - rect.top) * scaleY,
    };
  };

  const handleWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setScale((prev) => Math.min(Math.max(0.1, prev * delta), 5));
    }
  };

  const handleMouseDown = (e) => {
    const point = getTransformedPoint(e.clientX, e.clientY);

    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      setIsPanning(true);
      return;
    }

    if (["circle", "rectangle", "triangle"].includes(currentTool)) {
      startShape(point.x, point.y);
    } else {
      setIsDrawing(true);
      setLastPoint(point);
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning) {
      setPan((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
      return;
    }

    const point = getTransformedPoint(e.clientX, e.clientY);

    if (["circle", "rectangle", "triangle"].includes(currentTool)) {
      if (isDrawingShape) {
        const ctx = contextRef.current;

        // Restore previous state
        if (canvasHistory.length > 0) {
          const img = new Image();
          img.src = canvasHistory[historyIndex];
          img.onload = () => {
            ctx.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            ctx.drawImage(img, 0, 0);
            if (showGrid) {
              drawGrid(
                ctx,
                canvasRef.current.width,
                canvasRef.current.height,
                gridSize
              );
            }
            drawShape(currentTool, point.x, point.y);
          };
        }
      }
      return;
    }

    if (!isDrawing || !lastPoint) return;

    const ctx = contextRef.current;

    if (currentTool === "brush") {
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      drawLineDDA(ctx, lastPoint.x, lastPoint.y, point.x, point.y);
    } else if (currentTool === "eraser") {
      const originalStyle = ctx.strokeStyle;
      ctx.strokeStyle = "white";
      drawLineDDA(ctx, lastPoint.x, lastPoint.y, point.x, point.y);
      ctx.strokeStyle = originalStyle;
    }

    setLastPoint(point);
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setIsDrawing(false);
    setLastPoint(null);

    if (
      ["circle", "rectangle", "triangle"].includes(currentTool) &&
      isDrawingShape
    ) {
      finishShape();
      saveToHistory();
    } else if (isDrawing) {
      saveToHistory();
    }
  };

  return (
    <div
      className="relative overflow-hidden border border-gray-300 bg-gray-50"
      style={{ width: "100%", height: "calc(100vh - 200px)" }}
    >
      <canvas
        ref={canvasRef}
        className="cursor-crosshair"
        style={{
          width: "100%",
          height: "100%",
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: "0 0",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
    </div>
  );
};

export default Canvas;
