import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import style from "./JoinPage.module.css";

import React, { Component, useCallback, useState } from 'react'
import { idDuplicateCheck, onCreateUser } from "../../api/userApi";

const JoinPage = () => {
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [userPw, setUserPw] = useState("");
    const [confirm, setConfirm] = useState('');
    const [userPosition, setUserPosition] = useState("");

    const [idError, setIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const [isIdCheck, setIsIdCheck] = useState(false);

    const navigate = useNavigate();

    //디바운스는 사용자가 입력을 멈춘 후 일정 시간이 지나면 한 번만 실행
    function debounce(func, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    }

    const onChangeIdHandler = (e) => {
        const { value } = e.target;
        const idRegex = /^.{2,20}$/;
        setUserId(value);
        if (!idRegex.test(value)) {
            setIdError('아이디는 그룹웨어와 같은 아이디를 권장합니다.');
        }
        else if (value.trim() !== '') {
            debouncedCheckUserId(value); // 디바운스된 함수 호출
        } else if (value.trim() === '') {
            setIdError('아이디는 그룹웨어와 같은 아이디를 권장합니다.');
            setIsIdCheck(false);
        }
    }

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

    const idCheckHandler = async (id) => {
        try {
            const responseData = await idDuplicateCheck(id);
            if (responseData.status === 201) {
                setIdError('이미 사용중인 아이디입니다.');
                setIsIdCheck(false);
                return false;
            }
            else if (responseData.status === 500) {
                setIdError('사용 가능한 아이디입니다.');
                setIsIdCheck(true);
                return true;
            } else {

            }
        } catch (error) {
            alert('서버 오류입니다. 관리자에게 문의하세요.');
            console.error(error);
            return false;
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

    // 디바운스를 적용한 아이디 체크 함수
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedCheckUserId = useCallback(debounce(idCheckHandler, 500), []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const idCheckresult = await idCheckHandler(userId);
        if (idCheckresult) setIdError('');
        else {
            alert('아이디를 확인해주세요');
            return;
        }

        const passwordCheckResult = await passwordCheckHandler(userPw, confirm);
        if (passwordCheckResult) { setPasswordError(''); setConfirmError(''); }
        else return;

        const response = await onCreateUser(userId, userPw, userName, 0, userPosition);
        if (response === undefined) {
            alert('사용자 인증이 만료되었습니다. 로그인 후 다시 시도해 주십시오');
        } else if (response.status === 201) {
            alert(`${userName} 회원가입에 성공했습니다`);
            navigate('/main');
        } else if (response.status === 400) {
            alert('비밀번호가 잘못되었습니다.');
        } else if (response.status === 500) {
            alert('아이디가 잘못되었습니다.');
        } else {
            console.log('Join 중 에러 발생', response);
            alert('관리자에게 문의 바랍니다.');
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
                                // onChange={(e) => setUserId(e.target.value)}
                                onChange={onChangeIdHandler}
                                required
                            />
                            <small className={style.joinMsg}>{idError}</small>
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