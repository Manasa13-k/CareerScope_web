import { apiFetch } from './api';

export const recommendationService = {
  async getRecommendations() {
    const data = await apiFetch('/recommendations');
    return data.recommendations || [];
  }
};
