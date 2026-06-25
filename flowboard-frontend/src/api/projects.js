import axiosInstance from './axios';

export const saveProjectElements = async (projectId, elements) => {
  try {
    const response = await axiosInstance.put(`/projects/${projectId}/save`, { elements });
    return response.data;
  } catch (error) {
    console.error('Error saving project:', error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await axiosInstance.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
