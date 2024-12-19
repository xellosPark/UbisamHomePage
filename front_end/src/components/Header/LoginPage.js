import React, { useContext, useState } from "react";
import logo from "../../images/icon/ubisamlogo.png"
import style from "./LoginPage.module.css";

import { onLogin, onTest } from "../../api/authApi";

const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await onLogin(userId, userPw); // ID와 PW를 부모 컴포넌트로 전달
        console.log('response', response);
        
        if (response.status === 200) {
            const { accessToken, refreshToken, userData } = await response.data;

            // 로컬 스토리지에 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userData', userData);
        }
    }

    const handleBtnClick = async () => {
        const response = await onTest();
        console.log('onTest response', response);
        
    }

    return (
        <div className={style.loginContainer}>
            <div className={style.login}>
                <div className={style.loginImg}>
                    <img alt='LG LOGO' src={logo} style={{ width: '150px', marginTop: '10px', marginBottom: '4px' }} />

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
                        <div className={style.loginSubmit}>
                            <button type="submit">로그인</button>
                        </div>
                    </div>
                </form>

                <div className={style.loginOptions}>
                    <span></span>
                    <div>
                        <span>아이디 찾기</span>
                        <span className={style.option} />
                        <span>비밀번호 찾기</span>
                    </div>
                </div>
            </div>
            <button onClick={handleBtnClick}>api 테스트 버튼</button>
        </div>
    );
};

export default LoginPage;