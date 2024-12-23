import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import style from "./JoinPage.module.css";

import React, { Component, useState } from 'react'
import { onCreateUser } from "../../api/userApi";

const JoinPage = () => {
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [userPw, setUserPw] = useState("");
    const [confirm, setConfirm] = useState('');
    const [userPosition, setUserPosition] = useState("");

    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const navigate = useNavigate();

    const onChangePasswordHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setUserPw(value);
            passwordCheckHandler(value, confirm);
        } else {
            setConfirm(value);
            passwordCheckHandler(userPw, value);
        }
    }

    const passwordCheckHandler = (password, confirm) => {
        const passwordRegex = /^[a-z\d!@*&-_]{8,20}$/;
        if (password === '') {
            setPasswordError('비밀번호를 입력해주세요.');
            return false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError('비밀번호는 8~20자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
            return false;
        } else if (confirm !== password) {
            setPasswordError('');
            setConfirmError('비밀번호가 일치하지 않습니다.');
            return false;
        } else {
            setPasswordError('');
            setConfirmError('');
            return true;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordCheckResult = passwordCheckHandler(userPw, confirm);
        if (passwordCheckResult) { setPasswordError(''); setConfirmError(''); }
        else return;

        const response = await onCreateUser(userId, userPw, userName, 0, userPosition);
        if (response.status === 201) {
            alert(`${userName} 회원가입에 성공했습니다`);
            navigate('/main');
        } else if (response.status === 400) {
            alert('비밀번호가 잘못되었습니다.');
        } else if (response.status === 500) {
            alert('아이디가 잘못되었습니다.');
        } else {

        }
    }

    return (
        <div className={style.joinContainer}>
            <div className={style.join}>
                <div className={style.joinImg}>
                    {/* <img alt='LG LOGO' src={logo} style={{ width: '150px', marginTop: '10px', marginBottom: '4px' }} /> */}
                    <span>회원가입</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={style.joinBox}>
                        <div className={style.joinBody}>

                            <span className={style.joinType}>아이디</span>
                            <input className={style.joinInput}
                                type="text"
                                value={userId}
                                placeholder='아이디는 그룹웨어와 동일하게 작성해주세요'
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            />
                            <span className={style.joinType}>이름</span>
                            <input className={style.joinInput}
                                type="text"
                                value={userName}
                                placeholder='이름을 입력해 주세요.'
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                            <span className={style.joinType}>비밀번호</span>
                            <input className={style.joinInput}
                                onChange={onChangePasswordHandler}
                                type="password"
                                id='password'
                                name='password'
                                value={userPw}
                                placeholder='비밀번호를 입력해 주세요.'
                                maxLength={20}
                                // onChange={(e) => setUserPw(e.target.value)}
                                required
                            />
                            <small className={style.joinMsg}>{passwordError ? passwordError : ""}</small>
                            <span className={style.joinType}>비밀번호 확인</span>
                            <input className={style.joinInput}
                                onChange={onChangePasswordHandler}
                                type="password"
                                id='confirm'
                                name='confirm'
                                value={confirm}
                                placeholder='비밀번호를 확인해 주세요.'
                                maxLength={20}
                                // onChange={(e) => setConfirm(e.target.value)}
                                required
                            />
                            <small className={style.joinMsg}>{confirmError ? confirmError : ""}</small>
                            <span className={style.joinType}>직급</span>
                            <input className={style.joinInput}
                                type="text"
                                value={userPosition}
                                placeholder='직급을 입력해 주세요.'
                                onChange={(e) => setUserPosition(e.target.value)}
                                required
                            />

                        </div>
                        <div className={style.joinSubmit}>
                            <button type="submit">회원가입</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default JoinPage;