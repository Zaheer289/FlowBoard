import React, { useState } from "react";
import '../styles/dashboard.css';
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";

export default function NewProjectModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await api.post('/projects',formData);
        console.log(response.status,response.data.message);
        if(response.status === 201) {
            const newProjectId = response.data.body._id;
            onClose();
            navigate(`/projects/${newProjectId}`);
            return;
        } else {
            console.error(response.data.message);
        }
    }
    catch(err){
      console.log(err.response?.data);
      console.error(err.response?.data?.message || err.message);
    }

    onClose();
    setFormData({
      name: "",
      visibility: "Private",
      tags: [],
      collaborators: [],
      template: "",
      description: ""
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
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
    </Modal>
  );
}
