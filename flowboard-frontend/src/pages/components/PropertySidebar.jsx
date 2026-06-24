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

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-white">Properties</h2>
      
      {selectedElementIds.length === 0 && (
        <p className="text-sm text-gray-400">Select a shape to edit its properties.</p>
      )}

      {selectedElementIds.length > 1 && (
        <p className="text-sm text-gray-400 mb-4">Multiple shapes selected.</p>
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