import React from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
        
        {/* Modal Content */}
        <div className={`relative bg-zinc-800 border border-cyan-800 rounded-lg shadow-2xl w-full max-w-md p-6 transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
            {/* Header with Title and Close (X) Button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-cyan-400">{title}</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
            </div>
            {/* Body */}
            {children}
        </div>
    </div>
  );
}
