import React, { useContext, useState } from "react";
import style from "./LoginPage.module.css";

import { onLogin, onTest } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleOption = () => {
        alert('관리자께 문의바랍니다');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await onLogin(userId, userPw); // ID와 PW를 부모 컴포넌트로 전달
        console.log('response', response);
        if (response.status === 200) {
            const { accessToken, refreshToken, userData } = await response.data;

            // 로컬 스토리지에 저장
            //localStorage.setItem('accessToken', accessToken);
            //localStorage.setItem('refreshToken', refreshToken);
            //localStorage.setItem('userData', userData);
            login(userData, accessToken, refreshToken);
            navigate('/main');
        } else if (response.status === 400) {
            alert('비밀번호가 잘못되었습니다.');
        } else if (response.status === 500) {
            alert('아이디가 잘못되었습니다.');
        } else {

        }
    }

    return (
        <div className={style.loginContainer}>
            <div className={style.login}>
                <div className={style.loginImg}>
                    {/* <img alt='LG LOGO' src={logo} style={{ width: '150px', marginTop: '10px', marginBottom: '4px' }} /> */}
                    <span>Login</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={style.loginBox}>
                        <div className={style.loginBody}>
                            <input className={style.loginInput}
                                type="text"
                                value={userId}
                                placeholder='아이디를 입력해 주세요.'
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            />
                            <input className={style.loginInput}
                                type="password"
                                value={userPw}
                                placeholder='비밀번호를 입력해 주세요.'
                                onChange={(e) => setUserPw(e.target.value)}
                                required
                            />
                        </div>
                        <div className={style.loginOptions}>
                            <div>
                                <span className={style.loginOption} type="button" onClick={handleOption}>아이디 찾기</span>
                                <span className={style.option} />
                                <span className={style.loginOption} type="button" onClick={handleOption}>비밀번호 찾기</span>
                            </div>
                        </div>
                        <div className={style.loginSubmit}>
                            <button type="submit">로그인</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;