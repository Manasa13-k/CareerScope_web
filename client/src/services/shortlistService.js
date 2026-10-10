import { apiFetch } from './api';

export const shortlistService = {
  async getShortlist() {
    const data = await apiFetch('/shortlist');
    return data.shortlist || { courses: [], careers: [] };
  },

  async addCourse(courseId) {
    const data = await apiFetch('/shortlist', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
    return data.shortlist;
  },

  async addCareer(careerId) {
    const data = await apiFetch('/shortlist', {
      method: 'POST',
      body: JSON.stringify({ careerId }),
    });
    return data.shortlist;
  },

  async removeItem(itemId) {
    const data = await apiFetch(`/shortlist/${itemId}`, {
      method: 'DELETE',
    });
    return data.shortlist;
  }
};
