import { Stage, Layer, Rect, Circle, Text, Transformer, Ellipse, Line, Arrow } from "react-konva";
import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setElements } from "../../features/board/boardSlice";

function CanvasBoard({ activeTool, setActiveTool, selectedElementIds, setSelectedElementIds, selectionRect, setSelectionRect, activeUsers, setActiveUsers }) {
  const dispatch = useDispatch();
  const elements = useSelector(state => state.board.present.elements);
  const [activeElement, setActiveElement] = useState(null);
  const isDrawing = useRef(false);
  const trRef = useRef();
  const shapeRefs = useRef({});
  const [editingTextId, setEditingTextId] = useState(null);

  const { id: projectId } = useParams();
  const socketRef = useRef(null);

  const containerRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setStageSize({ width, height });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!projectId) return;

    // 2. Initialize the socket connection, with credentials to attach httpOnly cookies
    socketRef.current = io('http://localhost:5000', {
      withCredentials: true
    });

    // 3. Once successfully connected, emit the join-project event
    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket server');
      socketRef.current.emit('join-project', { projectId });
    });

    // Listen for room users update
    socketRef.current.on('room-users-update', (users) => {
      setActiveUsers(users);
    });

    // 4. Basic error logging for authentication failures
    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });

    // 5. CRITICAL CLEANUP: Disconnect the socket when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.off('room-users-update');
        socketRef.current.disconnect();
        console.log('Disconnected from WebSocket server');
      }
    };
  }, [projectId]);

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
      let newElement = {
        id: Date.now().toString(),
        type: activeTool,
        x: pos.x,
        y: pos.y,
        fill: '#e2e8f0',
        stroke: '#000000',
        strokeWidth: 0,
        opacity: 1
      };

      if (activeTool === 'arrow' || activeTool === 'line') {
        newElement.points = [pos.x, pos.y, pos.x, pos.y];
        newElement.strokeWidth = 4;
        newElement.stroke = '#e2e8f0';
        newElement.fill = '#e2e8f0';
      } else if (activeTool === 'text') {
        newElement.width = 0;
        newElement.height = 0;
        newElement.text = "Double click to edit";
        newElement.fontSize = 20;
      } else {
        newElement.width = 0;
        newElement.height = 0;
      }

      setActiveElement(newElement);
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

    const isShiftPressed = e.evt.shiftKey;

    // Update the width and height of the local active element
    setActiveElement((prevElement) => {
      if (!prevElement) return null;
      const lastElement = { ...prevElement };

      if (lastElement.type === 'arrow' || lastElement.type === 'line') {
        let currentX = pos.x;
        let currentY = pos.y;

        if (isShiftPressed) {
          const dx = pos.x - lastElement.points[0];
          const dy = pos.y - lastElement.points[1];
          if (Math.abs(dx) > Math.abs(dy)) {
            currentY = lastElement.points[1];
          } else {
            currentX = lastElement.points[0];
          }
        }

        lastElement.points = [lastElement.points[0], lastElement.points[1], currentX, currentY];
      } else {
        let width = pos.x - lastElement.x;
        let height = pos.y - lastElement.y;

        if (isShiftPressed) {
          const maxDim = Math.max(Math.abs(width), Math.abs(height));
          width = (Math.sign(width) || 1) * maxDim;
          height = (Math.sign(height) || 1) * maxDim;
        }

        lastElement.width = width;
        lastElement.height = height;
      }

      return lastElement;
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
      if (activeElement) {
        dispatch(setElements([...elements, activeElement]));
        setActiveElement(null);
      }
      isDrawing.current = false;
      // Revert back to selection mode so the user doesn't accidentally draw another shape immediately
      setActiveTool('select');
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden fb-canvas-container" style={{ position: 'relative' }}>
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          {(activeElement ? [...elements, activeElement] : elements).map((shape) => {
            const commonProps = {
              id: shape.id,
              ref: (node) => { shapeRefs.current[shape.id] = node; },
              fill: shape.fill || 'transparent',
              stroke: shape.stroke || '#000000',
              strokeWidth: shape.strokeWidth || 0,
              hitStrokeWidth: 15,
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
                const node = e.target;
                if (shape.type === 'line' || shape.type === 'arrow') {
                  const transform = node.getTransform();
                  const newPoints = [];
                  for (let i = 0; i < shape.points.length; i += 2) {
                    const pt = transform.point({ x: shape.points[i], y: shape.points[i + 1] });
                    newPoints.push(pt.x, pt.y);
                  }
                  node.x(0);
                  node.y(0);
                  dispatch(setElements(elements.map(el =>
                    el.id === shape.id ? { ...el, points: newPoints, x: 0, y: 0 } : el
                  )));
                } else {
                  dispatch(setElements(elements.map(el =>
                    el.id === shape.id ? { ...el, x: node.x(), y: node.y() } : el
                  )));
                }
              },
              onTransformEnd: (e) => {
                const node = e.target;
                if (shape.type === 'line' || shape.type === 'arrow') {
                  const transform = node.getTransform();
                  const newPoints = [];
                  for (let i = 0; i < shape.points.length; i += 2) {
                    const pt = transform.point({ x: shape.points[i], y: shape.points[i + 1] });
                    newPoints.push(pt.x, pt.y);
                  }
                  node.scaleX(1);
                  node.scaleY(1);
                  node.rotation(0);
                  node.x(0);
                  node.y(0);
                  dispatch(setElements(elements.map(el =>
                    el.id === shape.id ? { ...el, points: newPoints, x: 0, y: 0 } : el
                  )));
                } else {
                  const scaleX = node.scaleX();
                  const scaleY = node.scaleY();
                  // Reset scale to 1 so the element's actual dimensions are updated
                  node.scaleX(1);
                  node.scaleY(1);

                  dispatch(setElements(elements.map(el =>
                    el.id === shape.id ? {
                      ...el,
                      x: node.x(),
                      y: node.y(),
                      width: Math.max(5, node.width() * scaleX),
                      height: Math.max(5, node.height() * scaleY),
                      rotation: node.rotation()
                    } : el
                  )));
                }
              }
            };

            if (shape.type === "rectangle") {
              return <Rect key={shape.id} {...shape} rotation={shape.rotation || 0} {...commonProps} />;
            }
            if (shape.type === "circle") {
              return <Ellipse key={shape.id} x={shape.x} y={shape.y} offsetX={-(Math.abs(shape.width) / 2)} offsetY={-(Math.abs(shape.height) / 2)} radiusX={Math.abs(shape.width / 2)} radiusY={Math.abs(shape.height / 2)} rotation={shape.rotation || 0} {...commonProps} />;
            }
            if (shape.type === "triangle") {
              return <Line key={shape.id} x={shape.x} y={shape.y} points={[shape.width / 2, 0, shape.width, shape.height, 0, shape.height]} closed={true} rotation={shape.rotation || 0} {...commonProps} />;
            }
            if (shape.type === "hexagon") {
              return <Line key={shape.id} x={shape.x} y={shape.y} points={[shape.width * 0.25, 0, shape.width * 0.75, 0, shape.width, shape.height / 2, shape.width * 0.75, shape.height, shape.width * 0.25, shape.height, 0, shape.height / 2]} closed={true} rotation={shape.rotation || 0} {...commonProps} />;
            }
            if (shape.type === "arrow") {
              return <Arrow key={shape.id} points={shape.points} pointerLength={10} pointerWidth={10} {...commonProps} x={0} y={0} />;
            }
            if (shape.type === "line") {
              return <Line key={shape.id} points={shape.points} {...commonProps} x={0} y={0} />;
            }
            if (shape.type === "text") {
              return <Text key={shape.id} text={shape.text} fontSize={shape.fontSize} x={shape.x} y={shape.y} width={Math.abs(shape.width)} height={Math.abs(shape.height)} rotation={shape.rotation || 0} visible={editingTextId !== shape.id} onDblClick={() => setEditingTextId(shape.id)} onDblTap={() => setEditingTextId(shape.id)} {...commonProps} />;
            }

            return <Rect key={shape.id} {...shape} rotation={shape.rotation || 0} {...commonProps} />;
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
      {elements.map((shape) => {
        if (shape.type === 'text' && editingTextId === shape.id) {
          return (
            <textarea
              key={`input-${shape.id}`}
              autoFocus
              defaultValue={shape.text}
              onBlur={(e) => {
                dispatch(setElements(elements.map(el => el.id === shape.id ? { ...el, text: e.target.value } : el)));
                setEditingTextId(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setEditingTextId(null);
              }}
              style={{
                position: 'absolute',
                top: `${shape.y}px`,
                left: `${shape.x}px`,
                width: `${Math.max(Math.abs(shape.width), 100)}px`,
                height: `${Math.max(Math.abs(shape.height), 50)}px`,
                fontSize: `${shape.fontSize || 20}px`,
                fontFamily: 'sans-serif',
                border: 'none',
                outline: 'none',
                resize: 'none',
                background: 'transparent',
                color: shape.fill || '#000000',
              }}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
export default CanvasBoard;