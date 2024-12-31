import { useState } from "react";
import { Settings } from "lucide-react";

const ResizeCanvas = ({ onResize }) => {
  const [showModal, setShowModal] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dimensions.width > 4000 || dimensions.height > 4000) {
      alert("ከ4000 በላይ አይቻልም!");
      return;
    }
    onResize(dimensions);
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="p-2 rounded hover:bg-gray-100"
        title="Resize Canvas"
      >
        <Settings size={24} />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">የወረቀት ስፋት</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ርዝመት
                </label>
                <input
                  type="number"
                  value={dimensions.width}
                  onChange={(e) =>
                    setDimensions((prev) => ({
                      ...prev,
                      width: Number(e.target.value),
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  min="1"
                  max="4000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ቁመት{" "}
                </label>
                <input
                  type="number"
                  value={dimensions.height}
                  onChange={(e) =>
                    setDimensions((prev) => ({
                      ...prev,
                      height: Number(e.target.value),
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  min="1"
                  max="4000"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-400 rounded-md hover:bg-gray-200"
                >
                  ትመለስ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  ተጠቀም
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResizeCanvas;
