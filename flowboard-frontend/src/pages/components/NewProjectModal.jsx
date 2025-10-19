import React, { useState } from "react";
import '../styles/dashboard.css'

export default function NewProjectModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "file",
    visibility: "Private",
    tags: [],
    collaborators: [],
    template: "",
    description: ""
  });
  const [tagInput, setTagInput] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagAdd = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
    setFormData({
      name: "",
      type: "file",
      visibility: "Private",
      tags: [],
      collaborators: [],
      template: "",
      description: ""
    });
  };

  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 opacity-80 bg-black z-40"></div>
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-2xl shadow-xl w-full max-w-3xl bg-opacity-20 px-12 py-6 text-white">
        <h2 className="text-3xl font-semibold mb-4 text-center new-project-title text-cyan-400">
          Create New Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Project Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-transparent"
              placeholder="Enter project name"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Project Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-zinc-800"
            >
              <option value="file">File</option>
              <option value="folder">Folder</option>
            </select>
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium mb-1">Visibility</label>
            <select
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
               className="w-full p-2 border rounded-md bg-transparent bg-zinc-800"
            >
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagAdd}
              placeholder="Press Enter to add tag"
              className="w-full p-2 border rounded-md bg-transparent"
            />
            <div className="flex flex-wrap mt-2 gap-2">
              {formData.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-cyan-600 hover:bg-cyan-700 px-2 py-1 rounded-md text-sm"
                  onClick={() => setFormData({ ...formData, tags: formData.tags.filter((item,idx) => idx!==i) })}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Template */}
          <div>
            <label className="block text-sm font-medium mb-1">Template</label>
            <select
              name="template"
              value={formData.template}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-zinc-800"
            >
              <option value="">Blank</option>
              <option value="database-schema">Database Schema</option>
              <option value="presentation">Presentation</option>
              <option value="flowchart">Flowchart</option>
              <option value="kanban-board">Kanban Board</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded-md bg-transparent resize-none"
              placeholder="Describe your project..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
