import { FiArrowUp, FiArrowDown, FiChevronsUp, FiChevronsDown } from "react-icons/fi";

function PropertySidebar({ elements, selectedElementIds, setElements, setSelectedElementIds }) {
  const selectedShape = selectedElementIds.length === 1 && elements ? elements.find(el => el.id === selectedElementIds[0]) : null;

  const handleChange = (property, value, isNumeric = false) => {
    const finalValue = isNumeric ? (parseFloat(value) || 0) : value;
    setElements(elements.map(el =>
      selectedElementIds.includes(el.id) ? { ...el, [property]: finalValue } : el
    ));
  };

  const handleDelete = () => {
    setElements(elements.filter(el => !selectedElementIds.includes(el.id)));
    setSelectedElementIds([]);
  };

  const bringToFront = () => {
    setElements(prev => {
      const selected = prev.filter(el => selectedElementIds.includes(el.id));
      const unselected = prev.filter(el => !selectedElementIds.includes(el.id));
      return [...unselected, ...selected];
    });
  };

  const sendToBack = () => {
    setElements(prev => {
      const selected = prev.filter(el => selectedElementIds.includes(el.id));
      const unselected = prev.filter(el => !selectedElementIds.includes(el.id));
      return [...selected, ...unselected];
    });
  };

  const bringForward = () => {
    setElements(prev => {
      const newElements = [...prev];
      for (let i = newElements.length - 2; i >= 0; i--) {
        if (selectedElementIds.includes(newElements[i].id) && !selectedElementIds.includes(newElements[i + 1].id)) {
          [newElements[i], newElements[i + 1]] = [newElements[i + 1], newElements[i]];
        }
      }
      return newElements;
    });
  };

  const sendBackward = () => {
    setElements(prev => {
      const newElements = [...prev];
      for (let i = 1; i < newElements.length; i++) {
        if (selectedElementIds.includes(newElements[i].id) && !selectedElementIds.includes(newElements[i - 1].id)) {
          [newElements[i], newElements[i - 1]] = [newElements[i - 1], newElements[i]];
        }
      }
      return newElements;
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-white">Properties</h2>

      {selectedElementIds.length === 0 && (
        <p className="text-sm text-gray-400">Select a shape to edit its properties.</p>
      )}

      {selectedElementIds.length > 1 && (
        <p className="text-sm text-gray-400 mb-4">Multiple shapes selected.</p>
      )}

      {selectedElementIds.length > 0 && (
        <div className="mb-4">
          <label className="text-sm text-gray-400 block mb-1">Arrange</label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={bringToFront} title="Bring to Front" className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors flex items-center justify-center gap-2 text-sm">Bring to Front</button>
            <button onClick={bringForward} title="Bring Forward" className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors flex items-center justify-center gap-2 text-sm">Bring Forward</button>
            <button onClick={sendBackward} title="Send Backward" className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors flex items-center justify-center gap-2 text-sm">Send Backward</button>
            <button onClick={sendToBack} title="Send to Back" className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors flex items-center justify-center gap-2 text-sm">Send to Back</button>
          </div>
        </div>
      )}

      {selectedShape && (
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">X Position</label>
            <input
              type="number"
              value={Math.round(selectedShape.x || 0)}
              onChange={(e) => handleChange('x', e.target.value, true)}
              className="w-full mt-1 p-2 bg-zinc-800 border border-cyan-700 text-white rounded-md focus:border-cyan-400 outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Y Position</label>
            <input
              type="number"
              value={Math.round(selectedShape.y || 0)}
              onChange={(e) => handleChange('y', e.target.value, true)}
              className="w-full mt-1 p-2 bg-zinc-800 border border-cyan-700 text-white rounded-md focus:border-cyan-400 outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Width</label>
            <input
              type="number"
              value={Math.round(selectedShape.width || 0)}
              onChange={(e) => handleChange('width', e.target.value, true)}
              className="w-full mt-1 p-2 bg-zinc-800 border border-cyan-700 text-white rounded-md focus:border-cyan-400 outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Height</label>
            <input
              type="number"
              value={Math.round(selectedShape.height || 0)}
              onChange={(e) => handleChange('height', e.target.value, true)}
              className="w-full mt-1 p-2 bg-zinc-800 border border-cyan-700 text-white rounded-md focus:border-cyan-400 outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Rotation (°)</label>
            <input
              type="number"
              value={(() => {
                if (selectedShape.type === 'line' || selectedShape.type === 'arrow') {
                  const p = selectedShape.points;
                  if (!p || p.length < 4) return 0;
                  return Math.round(Math.atan2(p[3] - p[1], p[2] - p[0]) * (180 / Math.PI));
                }
                return Math.round(selectedShape.rotation || 0);
              })()}
              onChange={(e) => {
                const val = parseFloat(e.target.value) || 0;
                if (selectedShape.type === 'line' || selectedShape.type === 'arrow') {
                  const p = selectedShape.points;
                  if (!p || p.length < 4) return;
                  const cx = (p[0] + p[2]) / 2;
                  const cy = (p[1] + p[3]) / 2;
                  const len = Math.hypot(p[2] - p[0], p[3] - p[1]);
                  const rad = val * (Math.PI / 180);
                  const dx = (len / 2) * Math.cos(rad);
                  const dy = (len / 2) * Math.sin(rad);
                  const newPoints = [cx - dx, cy - dy, cx + dx, cy + dy];
                  handleChange('points', newPoints);
                } else {
                  const newAngle = val;
                  const oldAngle = selectedShape.rotation || 0;

                  const radOld = oldAngle * (Math.PI / 180);
                  const radNew = newAngle * (Math.PI / 180);

                  const lcx = selectedShape.width / 2;
                  const lcy = selectedShape.height / 2;

                  const cx = selectedShape.x + lcx * Math.cos(radOld) - lcy * Math.sin(radOld);
                  const cy = selectedShape.y + lcx * Math.sin(radOld) + lcy * Math.cos(radOld);

                  const newX = cx - (lcx * Math.cos(radNew) - lcy * Math.sin(radNew));
                  const newY = cy - (lcx * Math.sin(radNew) + lcy * Math.cos(radNew));

                  setElements(elements.map(el =>
                    selectedElementIds.includes(el.id)
                      ? { ...el, rotation: newAngle, x: newX, y: newY }
                      : el
                  ));
                }
              }}
              className="w-full mt-1 p-2 bg-zinc-800 border border-cyan-700 text-white rounded-md focus:border-cyan-400 outline-none transition-all"
            />
          </div>

          {selectedShape.type === 'text' && (
            <div>
              <label className="text-sm text-gray-400">Font Size</label>
              <input
                type="number"
                value={selectedShape.fontSize || 20}
                onChange={(e) => handleChange('fontSize', e.target.value, true)}
                className="w-full mt-1 p-2 bg-zinc-800 border border-cyan-700 text-white rounded-md focus:border-cyan-400 outline-none transition-all"
              />
            </div>
          )}

          <hr className="border-cyan-800 my-4" />

          <div>
            <label className="text-sm text-gray-400">Fill Color</label>
            <div className="flex items-center gap-3 mt-1">
              <input
                type="color"
                value={selectedShape.fill || '#e2e8f0'}
                onChange={(e) => handleChange('fill', e.target.value)}
                className="w-10 h-10 bg-transparent rounded cursor-pointer"
              />
              <span className="text-white uppercase">{selectedShape.fill || '#e2e8f0'}</span>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400">Stroke Color</label>
            <div className="flex items-center gap-3 mt-1">
              <input
                type="color"
                value={selectedShape.stroke || '#000000'}
                onChange={(e) => handleChange('stroke', e.target.value)}
                className="w-10 h-10 bg-transparent rounded cursor-pointer"
              />
              <span className="text-white uppercase">{selectedShape.stroke || '#000000'}</span>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400">Stroke Thickness</label>
            <input
              type="number"
              min="0"
              value={selectedShape.strokeWidth || 0}
              onChange={(e) => handleChange('strokeWidth', e.target.value, true)}
              className="w-full mt-1 p-2 bg-zinc-800 border border-cyan-700 text-white rounded-md focus:border-cyan-400 outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 flex justify-between">
              Opacity <span>{selectedShape.opacity ?? 1}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={selectedShape.opacity ?? 1}
              onChange={(e) => handleChange('opacity', e.target.value, true)}
              className="w-full mt-2 accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>
      )}

      {selectedElementIds.length > 0 && (
        <button
          onClick={handleDelete}
          className="mt-6 w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors"
        >
          Delete Selected
        </button>
      )}
    </div>
  );
}
export default PropertySidebar;