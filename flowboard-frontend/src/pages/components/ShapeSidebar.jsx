import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { TfiText } from "react-icons/tfi";
import { IoTriangleOutline, IoArrowForwardOutline } from "react-icons/io5";
import { MdOutlineHexagon } from "react-icons/md";
import { TbArrowCurveRight } from "react-icons/tb";

function ShapeSidebar({ onAddShape }) {
  const shapes = [
    { name: "Rectangle", icon: <RiRectangleLine size={22} /> },
    { name: "Circle", icon: <FaRegCircle size={20} /> },
    { name: "Triangle", icon: <IoTriangleOutline size={22} /> },
    { name: "Arrow", icon: <IoArrowForwardOutline size={22} /> },
    { name: "Curved Arrow", icon: <TbArrowCurveRight size={22} /> },
    { name: "Hexagon", icon: <MdOutlineHexagon size={22} /> },
    { name: "Text", icon: <TfiText size={20} /> },
  ];

  return (
    <div className="wrapper p-3">
        <h1 className="text-center text-xl my-3">Shapes</h1>
        <hr className=' border-0 bg-cyan-700 h-[1px] text-center mt-3 mx-auto' />
        <div className="grid grid-cols-4 items-center gap-4 p-3">
        {shapes.map((shape, idx) => (
            <button
            key={idx}
            onClick={() => onAddShape(shape.name)}
            className="flex flex-col items-center justify-center w-10 h-10 bg-cyan-700 hover:bg-cyan-600 rounded-lg transition-all duration-200"
            title={shape.name}
            >
            {shape.icon}
            </button>
        ))}
        </div>
    </div>
  );
}

export default ShapeSidebar;