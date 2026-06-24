import { Stage, Layer, Rect, Circle, Text, Transformer } from "react-konva";
import { useRef, useEffect } from "react";

function CanvasBoard({ elements, setElements, activeTool, setActiveTool, selectedElementId, setSelectedElementId }) {
  const isDrawing = useRef(false);
  const trRef = useRef();

  useEffect(() => {
    if (selectedElementId && trRef.current) {
      const stage = trRef.current.getStage();
      const selectedNode = stage.findOne('#' + selectedElementId);
      if (selectedNode) {
        trRef.current.nodes([selectedNode]);
        trRef.current.getLayer().batchDraw();
      }
    } else if (trRef.current) {
      trRef.current.nodes([]);
    }
  }, [selectedElementId, elements]);

  const handleMouseDown = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();

    if (activeTool === 'select') {
      if (clickedOnEmpty) {
        setSelectedElementId(null);
      }
      return;
    }

    if (clickedOnEmpty && activeTool !== 'select') {
      const pos = e.target.getStage().getPointerPosition();
      const newElement = {
        id: Date.now().toString(),
        type: activeTool,
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        fill: "cyan"
      };

      setElements([...elements, newElement]);
      isDrawing.current = true;
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || activeTool === 'select') return;

    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();

    // Update the width and height of the last element being drawn
    setElements((prevElements) => {
      const lastIndex = prevElements.length - 1;
      const lastElement = { ...prevElements[lastIndex] };
      lastElement.width = pos.x - lastElement.x;
      lastElement.height = pos.y - lastElement.y;

      const newElements = [...prevElements];
      newElements[lastIndex] = lastElement;
      console.log(newElements);
      return newElements;
    });
  };

  const handleMouseUp = () => {
    if (isDrawing.current) {
      isDrawing.current = false;
      // Revert back to selection mode so the user doesn't accidentally draw another shape immediately
      setActiveTool('select');
    }
  };

  return (
    <Stage
      width={window.innerWidth * 0.6}
      height={window.innerHeight * 0.8}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      <Layer>
        {elements.map((shape) => {
          const isSelected = shape.id === selectedElementId;
          const strokeProp = isSelected ? { stroke: 'white', strokeWidth: 2 } : {};

          const commonProps = {
            id: shape.id,
            fill: shape.fill || 'transparent',
            draggable: activeTool === 'select',
            onClick: (e) => {
              if (activeTool !== 'select') return;
              e.cancelBubble = true;
              setSelectedElementId(shape.id);
            },
            onTap: (e) => {
              if (activeTool !== 'select') return;
              e.cancelBubble = true;
              setSelectedElementId(shape.id);
            },
            onDragEnd: (e) => {
              setElements(elements.map(el =>
                el.id === shape.id ? { ...el, x: e.target.x(), y: e.target.y() } : el
              ));
            },
            onTransformEnd: (e) => {
              const node = e.target;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();
              // Reset scale to 1 so the element's actual dimensions are updated
              node.scaleX(1);
              node.scaleY(1);

              setElements(elements.map(el =>
                el.id === shape.id ? {
                  ...el,
                  x: node.x(),
                  y: node.y(),
                  width: Math.max(5, node.width() * scaleX),
                  height: Math.max(5, node.height() * scaleY)
                } : el
              ));
            }
          };

          if (shape.type === "rectangle") {
            return <Rect key={shape.id} {...shape} {...strokeProp} {...commonProps} />;
          }
          if (shape.type === "circle") {
            const radius = Math.max(Math.abs(shape.width), Math.abs(shape.height)) / 2;
            return <Circle key={shape.id} x={shape.x + shape.width / 2} y={shape.y + shape.height / 2} radius={radius} fill={shape.fill} {...strokeProp} {...commonProps} />;
          }
          if (shape.type === "text") {
            return <Text key={shape.id} {...shape} {...strokeProp} {...commonProps} />;
          }

          return <Rect key={shape.id} {...shape} {...strokeProp} {...commonProps} />;
        })}
        <Transformer ref={trRef} boundBoxFunc={(oldBox, newBox) => {
          // Prevent resizing too small
          if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) return oldBox;
          return newBox;
        }} />
      </Layer>
    </Stage>
  );
}
export default CanvasBoard;