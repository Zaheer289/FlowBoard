function PropertySidebar({ selectedShape, onChange }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      {selectedShape ? (
        <>
          <label>Color</label>
          <input
            type="color"
            value={selectedShape.fill}
            onChange={(e) => onChange("fill", e.target.value)}
            className="w-full mt-2"
          />
        </>
      ) : (
        <p>Select a shape to edit.</p>
      )}
    </div>
  );
}
export default PropertySidebar;