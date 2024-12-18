import { useState } from 'react';
import { useDrawingContext } from '../contexts/DrawingContext';

const ColorPicker = () => {
  const { strokeColor, setStrokeColor } = useDrawingContext();
  const [showColorHistory, setShowColorHistory] = useState(false);
  const [colorHistory, setColorHistory] = useState(['#000000', '#ff0000', '#00ff00', '#0000ff']);

  const handleColorChange = (color) => {
    setStrokeColor(color);
    if (!colorHistory.includes(color)) {
      setColorHistory(prev => [color, ...prev.slice(0, 19)]);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={strokeColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-8 h-8 cursor-pointer rounded"
        />
        <input
          type="text"
          value={strokeColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-20 px-2 py-1 text-sm border rounded"
          pattern="^#[0-9A-Fa-f]{6}$"
        />
        <button
          onClick={() => setShowColorHistory(!showColorHistory)}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          History
        </button>
      </div>

      {showColorHistory && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-white rounded-lg shadow-lg z-10">
          <div className="grid grid-cols-5 gap-1">
            {colorHistory.map((color, index) => (
              <button
                key={index}
                onClick={() => handleColorChange(color)}
                className="w-6 h-6 rounded border border-gray-300"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;