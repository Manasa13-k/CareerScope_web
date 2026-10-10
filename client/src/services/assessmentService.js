import { apiFetch } from './api';

export const assessmentService = {
  async getQuestions() {
    const data = await apiFetch('/assessment/questions');
    return data.questions || [];
  },

  async submitAssessment(answers) {
    const data = await apiFetch('/assessment/submit', {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
    return data.assessmentResults;
  }
};
