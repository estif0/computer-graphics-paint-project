import { 
  Paintbrush, 
  Eraser, 
  Circle, 
  Square, 
  Triangle,
  Undo2, 
  Redo2, 
  Download,
  Trash2,
  Grid
} from 'lucide-react';
import { useDrawingContext } from '../contexts/DrawingContext';

const Toolbar = () => {
  const { 
    currentTool, 
    setCurrentTool,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    canvasHistory,
    historyIndex,
    setHistoryIndex,
    showGrid,
    setShowGrid,
    gridSize,
    setGridSize
  } = useDrawingContext();

  const tools = [
    { id: 'brush', icon: Paintbrush, tooltip: 'Brush' },
    { id: 'eraser', icon: Eraser, tooltip: 'Eraser' },
    { id: 'circle', icon: Circle, tooltip: 'Circle' },
    { id: 'rectangle', icon: Square, tooltip: 'Rectangle' },
    { id: 'triangle', icon: Triangle, tooltip: 'Triangle' }
  ];

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const img = new Image();
      img.src = canvasHistory[historyIndex - 1];
      img.onload = () => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  const handleRedo = () => {
    if (historyIndex < canvasHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const img = new Image();
      img.src = canvasHistory[historyIndex + 1];
      img.onload = () => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  const handleClear = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = (format) => {
    const canvas = document.querySelector('canvas');
    const link = document.createElement('a');
    
    switch (format) {
      case 'png':
        link.download = 'drawing.png';
        link.href = canvas.toDataURL();
        break;
      case 'jpeg':
        link.download = 'drawing.jpg';
        link.href = canvas.toDataURL('image/jpeg');
        break;
      case 'svg':
        // Basic SVG export - could be enhanced
        const svg = `
          <svg width="${canvas.width}" height="${canvas.height}" 
               xmlns="http://www.w3.org/2000/svg">
            <image href="${canvas.toDataURL()}" />
          </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        link.download = 'drawing.svg';
        link.href = URL.createObjectURL(blob);
        break;
    }
    
    link.click();
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col gap-2">
        {tools.map(({ id, icon: Icon, tooltip }) => (
          <button
            key={id}
            className={`p-2 rounded hover:bg-gray-100 ${
              currentTool === id ? 'bg-blue-100' : ''
            }`}
            onClick={() => setCurrentTool(id)}
            title={tooltip}
          >
            <Icon size={24} />
          </button>
        ))}
      </div>

      <div className="border-t pt-4">
        <input
          type="color"
          value={strokeColor}
          onChange={(e) => setStrokeColor(e.target.value)}
          className="w-full h-8 cursor-pointer"
        />
        <input
          type="range"
          min="1"
          max="50"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(e.target.value)}
          className="w-full mt-2"
        />
      </div>

      <div className="border-t pt-4">
        <div className="flex flex-col gap-2">
          <button
            className={`p-2 rounded hover:bg-gray-100 ${showGrid ? 'bg-blue-100' : ''}`}
            onClick={() => setShowGrid(!showGrid)}
            title="Toggle Grid"
          >
            <Grid size={24} />
          </button>
          {showGrid && (
            <input
              type="range"
              min="10"
              max="100"
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
              className="w-full"
              title="Grid Size"
            />
          )}
        </div>
      </div>

      <div className="border-t pt-4 flex flex-col gap-2">
        <button
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          onClick={handleUndo}
          disabled={historyIndex <= 0}
          title="Undo"
        >
          <Undo2 size={24} />
        </button>
        <button
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          onClick={handleRedo}
          disabled={historyIndex >= canvasHistory.length - 1}
          title="Redo"
        >
          <Redo2 size={24} />
        </button>
      </div>

      <div className="border-t pt-4">
        <div className="flex flex-col gap-2">
          <button
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
            onClick={() => handleSave('png')}
          >
            <Download size={20} /> PNG
          </button>
          <button
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
            onClick={() => handleSave('jpeg')}
          >
            <Download size={20} /> JPEG
          </button>
          <button
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
            onClick={() => handleSave('svg')}
          >
            <Download size={20} /> SVG
          </button>
        </div>
      </div>

      <button
        className="flex items-center gap-2 p-2 rounded hover:bg-red-100 text-red-600"
        onClick={handleClear}
        title="Clear Canvas"
      >
        <Trash2 size={24} />
      </button>
    </div>
  );
};

export default Toolbar;