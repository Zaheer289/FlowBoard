import { Stage, Layer, Rect, Circle, Text, Transformer } from "react-konva";
import { useRef, useEffect } from "react";

function CanvasBoard({ elements, setElements, activeTool, setActiveTool, selectedElementIds, setSelectedElementIds, selectionRect, setSelectionRect }) {
  const isDrawing = useRef(false);
  const trRef = useRef();
  const shapeRefs = useRef({});

  useEffect(() => {
    if (selectedElementIds.length > 0 && trRef.current) {
      const selectedNodes = selectedElementIds
        .map(id => shapeRefs.current[id])
        .filter(node => node !== undefined && node !== null);
      
      trRef.current.nodes(selectedNodes);
      trRef.current.getLayer().batchDraw();
    } else if (trRef.current) {
      trRef.current.nodes([]);
    }
  }, [selectedElementIds, elements]);

  const handleMouseDown = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();

    if (activeTool === 'select') {
      if (clickedOnEmpty) {
        setSelectedElementIds([]);
        const pos = e.target.getStage().getPointerPosition();
        setSelectionRect({
          visible: true,
          x1: pos.x,
          y1: pos.y,
          x2: pos.x,
          y2: pos.y
        });
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
        fill: '#e2e8f0',
        stroke: '#000000',
        strokeWidth: 0,
        opacity: 1
      };

      setElements([...elements, newElement]);
      isDrawing.current = true;
    }
  };

  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();

    if (selectionRect && selectionRect.visible) {
      setSelectionRect({
        ...selectionRect,
        x2: pos.x,
        y2: pos.y
      });
      return;
    }

    if (!isDrawing.current || activeTool === 'select') return;

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
    if (selectionRect && selectionRect.visible) {
      setSelectionRect({ ...selectionRect, visible: false });

      const selBox = {
        x: Math.min(selectionRect.x1, selectionRect.x2),
        y: Math.min(selectionRect.y1, selectionRect.y2),
        width: Math.abs(selectionRect.x1 - selectionRect.x2),
        height: Math.abs(selectionRect.y1 - selectionRect.y2),
      };

      if (selBox.width === 0 && selBox.height === 0) return;

      const selectedIds = elements.filter(shape => {
        const shapeBox = {
          x: shape.x,
          y: shape.y,
          width: shape.width,
          height: shape.height
        };
        
        const sx = Math.min(shapeBox.x, shapeBox.x + shapeBox.width);
        const sy = Math.min(shapeBox.y, shapeBox.y + shapeBox.height);
        const sw = Math.abs(shapeBox.width);
        const sh = Math.abs(shapeBox.height);

        return (
          selBox.x < sx + sw &&
          selBox.x + selBox.width > sx &&
          selBox.y < sy + sh &&
          selBox.y + selBox.height > sy
        );
      }).map(shape => shape.id);

      if (selectedIds.length > 0) {
        setSelectedElementIds(selectedIds);
      }
      return;
    }

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
          const commonProps = {
            id: shape.id,
            ref: (node) => { shapeRefs.current[shape.id] = node; },
            fill: shape.fill || 'transparent',
            stroke: shape.stroke || '#000000',
            strokeWidth: shape.strokeWidth || 0,
            opacity: shape.opacity ?? 1,
            draggable: activeTool === 'select',
            onClick: (e) => {
              if (activeTool !== 'select') return;
              e.cancelBubble = true;
              if (e.evt.shiftKey) {
                if (selectedElementIds.includes(shape.id)) {
                  setSelectedElementIds(selectedElementIds.filter(id => id !== shape.id));
                } else {
                  setSelectedElementIds([...selectedElementIds, shape.id]);
                }
              } else {
                setSelectedElementIds([shape.id]);
              }
            },
            onTap: (e) => {
              if (activeTool !== 'select') return;
              e.cancelBubble = true;
              setSelectedElementIds([shape.id]);
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
            return <Rect key={shape.id} {...shape} {...commonProps} />;
          }
          if (shape.type === "circle") {
            const radius = Math.max(Math.abs(shape.width), Math.abs(shape.height)) / 2;
            return <Circle key={shape.id} x={shape.x + shape.width / 2} y={shape.y + shape.height / 2} radius={radius} fill={shape.fill} stroke={shape.stroke} strokeWidth={shape.strokeWidth} {...commonProps} />;
          }
          if (shape.type === "text") {
            return <Text key={shape.id} {...shape} {...commonProps} />;
          }

          return <Rect key={shape.id} {...shape} {...commonProps} />;
        })}
        <Transformer ref={trRef} boundBoxFunc={(oldBox, newBox) => {
          // Prevent resizing too small
          if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) return oldBox;
          return newBox;
        }} />
        {selectionRect && selectionRect.visible && (
          <Rect
            x={Math.min(selectionRect.x1, selectionRect.x2)}
            y={Math.min(selectionRect.y1, selectionRect.y2)}
            width={Math.abs(selectionRect.x1 - selectionRect.x2)}
            height={Math.abs(selectionRect.y1 - selectionRect.y2)}
            fill="rgba(0, 161, 255, 0.3)"
            stroke="rgba(0, 161, 255, 0.8)"
            strokeWidth={1}
          />
        )}
      </Layer>
    </Stage>
  );
}
export default CanvasBoard;