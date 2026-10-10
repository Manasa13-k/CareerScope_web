import { apiFetch } from './api';

export const authService = {
  async register(name, email, password, confirmPassword) {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });

    if (data.token) {
      localStorage.setItem('careerscope_token', data.token);
      localStorage.setItem('careerscope_user', JSON.stringify(data.user));
    }
    return data;
  },

  async login(email, password) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      localStorage.setItem('careerscope_token', data.token);
      localStorage.setItem('careerscope_user', JSON.stringify(data.user));
    }
    return data;
  },

  async getMe() {
    const data = await apiFetch('/auth/me');
    if (data.user) {
      localStorage.setItem('careerscope_user', JSON.stringify(data.user));
    }
    return data.user;
  },

  async getProfile() {
    const data = await apiFetch('/users/profile');
    return data.user;
  },

  async updateProfile(profileData) {
    const data = await apiFetch('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    if (data.user) {
      localStorage.setItem('careerscope_user', JSON.stringify(data.user));
    }
    return data.user;
  },

  logout() {
    localStorage.removeItem('careerscope_token');
    localStorage.removeItem('careerscope_user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('careerscope_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('careerscope_token');
  }
};
