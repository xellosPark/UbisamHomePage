import React, { createContext, useContext, useState, useEffect } from 'react';

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 사용자 정보
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 상태

  // 로컬 스토리지에서 토큰과 사용자 정보 확인
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userData = JSON.parse(localStorage.getItem('user'));
    if (accessToken && userData) {
      setIsAuthenticated(true);
      setUser(userData);
    }
  }, []);

  // 로그인 함수
  const login = (userData, accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 쉽게 사용하기 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);
