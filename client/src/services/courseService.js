import { apiFetch } from './api';

export const courseService = {
  async getCourses(filters = {}) {
    const queryParams = new URLSearchParams();
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.stream && filters.stream !== 'All') queryParams.append('stream', filters.stream);
    if (filters.sector && filters.sector !== 'All') queryParams.append('sector', filters.sector);
    if (filters.interest && filters.interest !== 'All') queryParams.append('interest', filters.interest);
    if (filters.duration && filters.duration !== 'All') queryParams.append('duration', filters.duration);

    const queryString = queryParams.toString();
    const endpoint = `/courses${queryString ? `?${queryString}` : ''}`;
    
    const data = await apiFetch(endpoint);
    return data.courses || [];
  },

  async getCourseById(id) {
    const data = await apiFetch(`/courses/${id}`);
    return data.course;
  }
};
