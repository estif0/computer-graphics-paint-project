import { createContext, useContext, useState } from 'react';

const DrawingContext = createContext();

export const DrawingProvider = ({ children }) => {
  const [currentTool, setCurrentTool] = useState('brush');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [canvasHistory, setCanvasHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showGrid, setShowGrid] = useState(false);
  const [gridSize, setGridSize] = useState(20);

  return (
    <DrawingContext.Provider
      value={{
        currentTool,
        setCurrentTool,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        canvasHistory,
        setCanvasHistory,
        historyIndex,
        setHistoryIndex,
        showGrid,
        setShowGrid,
        gridSize,
        setGridSize,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
};

export const useDrawingContext = () => {
  const context = useContext(DrawingContext);
  if (!context) {
    throw new Error('useDrawingContext must be used within a DrawingProvider');
  }
  return context;
};