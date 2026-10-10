import { apiFetch } from './api';

export const careerService = {
  async getCareers(filters = {}) {
    const queryParams = new URLSearchParams();
    if (filters.sector && filters.sector !== 'All') queryParams.append('sector', filters.sector);
    if (filters.search) queryParams.append('search', filters.search);

    const queryString = queryParams.toString();
    const endpoint = `/careers${queryString ? `?${queryString}` : ''}`;

    const data = await apiFetch(endpoint);
    return data.careers || [];
  },

  async getCareerById(id) {
    const data = await apiFetch(`/careers/${id}`);
    return data.career;
  }
};
