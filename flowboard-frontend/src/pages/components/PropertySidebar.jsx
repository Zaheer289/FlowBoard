function PropertySidebar({ elements, selectedElementId, setElements }) {
  const selectedShape = elements ? elements.find(el => el.id === selectedElementId) : null;

  const handleChange = (property, value) => {
    const numericValue = parseFloat(value) || 0;
    setElements(elements.map(el => 
      el.id === selectedElementId ? { ...el, [property]: numericValue } : el
    ));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-white">Properties</h2>
      {selectedShape ? (
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">X Position</label>
            <input 
              type="number" 
              value={Math.round(selectedShape.x || 0)} 
              onChange={(e) => handleChange('x', e.target.value)}
              className="w-full mt-1 p-2 bg-zinc-800 border border-cyan-700 text-white rounded-md focus:border-cyan-400 outline-none transition-all" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Y Position</label>
            <input 
              type="number" 
              value={Math.round(selectedShape.y || 0)} 
              onChange={(e) => handleChange('y', e.target.value)}
              className="w-full mt-1 p-2 bg-zinc-800 border border-cyan-700 text-white rounded-md focus:border-cyan-400 outline-none transition-all" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Width</label>
            <input 
              type="number" 
              value={Math.round(selectedShape.width || 0)} 
              onChange={(e) => handleChange('width', e.target.value)}
              className="w-full mt-1 p-2 bg-zinc-800 border border-cyan-700 text-white rounded-md focus:border-cyan-400 outline-none transition-all" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Height</label>
            <input 
              type="number" 
              value={Math.round(selectedShape.height || 0)} 
              onChange={(e) => handleChange('height', e.target.value)}
              className="w-full mt-1 p-2 bg-zinc-800 border border-cyan-700 text-white rounded-md focus:border-cyan-400 outline-none transition-all" 
            />
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-400">Select a shape to edit its properties.</p>
      )}
    </div>
  );
}
export default PropertySidebar;