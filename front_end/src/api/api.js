import axios from 'axios';
import { refreshAccessToken } from './authApi';

const api = axios.create({
  baseURL: 'http://localhost:8001',
  headers: { 'Content-Type': 'application/json' },
  //timeout: 5000,
});

let logoutCallback = null;

export const setLogoutCallback = (callback) => {
  logoutCallback = callback;
};

// Axios 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      console.log('access 있음');
      
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response, // 성공 응답은 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // 401 상태 코드만 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('401 Unauthorized detected - attempting token refresh...');
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const newAccessToken = await refreshAccessToken(refreshToken);

        // 새 Access Token 저장 및 요청 헤더 업데이트
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originalRequest); // 원래 요청 재시도
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError.message);
        if (logoutCallback) logoutCallback();
        // 페이지를 로그인 화면으로 리다이렉트 (선택적)
        window.location.href = '/main';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // 다른 에러는 그대로 반환
  }
);

export default api;