import api from "./api";

export const onLogin = async (id, pw) => {
    try {
        const response = await api.post(`/api/auth/login`,
            {
                user_id : id,
                user_password : pw,
            }
        );
        
        return response;
      } catch (error) {
        if (error.response) {
          return error.response;
        }
      }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await api.post('/api/auth/refresh', { refreshToken });
    const newAccessToken = response.data.accessToken; // 서버 응답에서 토큰 추출

    return newAccessToken; // 새 Access Token 반환
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    throw error; // 실패 시 에러를 던짐
  }
};


export const loginCheck = async () => {
  try {
      const response = await api.get(`/api/auth/login-check`);
      
      return response;
    } catch (error) {
      console.log('login check error', error);
      
      if (error.response) {
        return error.response;
      }
    }
};