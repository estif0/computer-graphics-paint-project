import { DrawingProvider } from "./contexts/DrawingContext";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import ColorPicker from "./components/ColorPicker";
import ResizeCanvas from "./components/ResizeCanvas";

function App() {
  const handleCanvasResize = ({ width, height }) => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    canvas.width = width;
    canvas.height = height;

    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <DrawingProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">ስዕል መሳያ</h1>
            <div className="flex items-center gap-4">
              <ColorPicker />
              <ResizeCanvas onResize={handleCanvasResize} />
            </div>
          </div>
          <div className="flex gap-8">
            <Toolbar />
            <div className="flex-1">
              <Canvas />
            </div>
          </div>
        </div>
      </div>
    </DrawingProvider>
  );
}

export default App;
