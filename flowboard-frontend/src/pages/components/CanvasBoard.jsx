import { Stage, Layer, Rect, Circle, Text } from "react-konva";
import { useState } from "react";
// { id: 1, type: "rect", x: 50, y: 60, width: 100, height: 80, fill: "cyan" },
function CanvasBoard() {
  const [shapes, setShapes] = useState([
  ]);

  return (
    <Stage width={window.innerWidth * 0.6} height={window.innerHeight * 0.8}>
      <Layer>
        {shapes.map((shape) => {
          if (shape.type === "rect")
            return <Rect key={shape.id} {...shape} draggable />;
          if (shape.type === "circle")
            return <Circle key={shape.id} {...shape} draggable />;
          if (shape.type === "text")
            return <Text key={shape.id} {...shape} draggable />;
          return null;
        })}
      </Layer>
    </Stage>
  );
}
export default CanvasBoard;