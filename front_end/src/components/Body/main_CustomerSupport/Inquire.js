
import React, { useState } from 'react'
import styles from './Inquire.module.css';
import { onCreateInquire } from '../../../api/dataApi';
import { useNavigate } from 'react-router-dom';
//import ReCAPTCHA from 'react-google-recaptcha';

const Inquire = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_first: "",
        phone_seconed: "",
        phone_last: "",
        tech: "",
        title: "",
        content: "",
    });

    const navigate = useNavigate();

    // reCAPTCHA 인증 처리
    const handleCaptchaChange = (value) => {
        console.log("Captcha value:", value);
        setCaptchaVerified(!!value); // value가 있으면 인증 성공
    };

    // 동의 체크박스 상태 변경
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = () => {
        const fullPhoneNumber = `${formData.phone_first}${formData.phone_seconed}${formData.phone_last}`;
        return /^\d{11}$/.test(fullPhoneNumber)
    };

    // 제출 버튼 클릭 시 처리
    const handleSubmit = async () => {

        if (formData.name === "" || formData.name.trim() === "") {
            alert('이름을 작성해 주세요.')
            return
        }

        if (!validateEmail(formData.email)) {
            alert('잘못된 이메일 형식입니다.')
            return
        }

        //if (formData.phone_first === "" || formData.phone_seconed === "" || formData.phone_last === "" ||
        //    formData.phone_first.trim() === "" || formData.phone_seconed.trim() === "" || formData.phone_last.trim() === "")
        if (!validatePhone())
        {
            alert('연락처를 남겨 주세요');
            return
        }

        if (formData.tech === "") {
            alert('기술 및 장비를 선택해 주세요');
            return
        }

        // const now = new Date();
        // const year = now.getFullYear();
        // const month = String(now.getMonth() + 1).padStart(2, "0");
        // const date = String(now.getDate()).padStart(2, "0");
        // const hours = String(now.getHours()).padStart(2, "0");
        // const minutes = String(now.getMinutes()).padStart(2, "0");
        // const seconds = String(now.getSeconds()).padStart(2, "0");
        // const formattedTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

        if (isChecked) { // && captchaVerified) {
            const result = await onCreateInquire(formData);
            if (result.status === 201) {
                alert("문의가 등록되었습니다!");
                navigate(`/main`);
            } else {
                alert("문의 등록 중 이상이 생겼습니다. 잠시 후에 다시 시도해 주시길 바랍니다");
            }
            

        } else {
            alert("모든 조건을 만족해야 제출할 수 있습니다.");
        }
    };

    return (
        <div className={styles.inquiryFormContainer}>
            <h2>문의하기</h2>
            <table className={styles.inquiryFormTable}>
                <tbody>
                    <tr>
                        <td>*이름</td>
                        <td>
                            <input type="text" name='name' placeholder="이름을 입력하세요" onChange={handleInputChange} value={formData.name} />
                        </td>
                    </tr>
                    <tr>
                        <td>*이메일</td>
                        <td>
                            <input type="email" name='email' placeholder="이메일을 입력하세요" onChange={handleInputChange} value={formData.email} />
                        </td>
                    </tr>
                    <tr>
                        <td>*연락처</td>
                        <td className={styles.contactField}>
                            <input type="tel" pattern="\d*" name='phone_first' maxLength="3" placeholder="010" onChange={handleInputChange} value={formData.phone_first} />
                            <span>-</span>
                            <input type="tel" pattern="\d*" name='phone_seconed' maxLength="4" placeholder="1234" onChange={handleInputChange} value={formData.phone_seconed} />
                            <span>-</span>
                            <input type="tel" pattern="\d*" name='phone_last' maxLength="4" placeholder="5678" onChange={handleInputChange} value={formData.phone_last} />
                        </td>
                    </tr>
                    <tr>
                        <td>*기술 및 장비</td>
                        <td>
                            <select name='tech' onChange={handleInputChange} value={formData.tech} >
                                <option value="">선택하기</option>
                                <option value="소프트웨어">소프트웨어</option>
                                <option value="하드웨어">하드웨어</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>제목</td>
                        <td>
                            <input type="text" name='title' placeholder="제목을 입력하세요" onChange={handleInputChange} value={formData.title} />
                        </td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                            <textarea name='content' placeholder="내용을 입력하세요" onChange={handleInputChange} value={formData.content} ></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.privacyPolicyContainer}>
                <h4>개인정보 수집 및 이용동의</h4>
                <div className={styles.privacyPolicyContent}>
                    <p>
                        유비샘 문의하기 진행을 위해 아래와 같이 개인정보를 수집 및 이용에
                        동의해주시기 바랍니다.
                    </p>
                    <p>
                        <strong>*</strong>수집항목 - 이름, 이메일, 연락처<br />
                        - 이름, 이메일, 연락처는 필수 수집항목으로 꼭 입력해 주셔야 합니다.
                    </p>
                    <p>
                        <strong>*</strong>이용목적 - 문의하기 답변 및 홍보자료 제공<br />
                        - 문의하기 외 목적으로 사용하지 않습니다.
                    </p>
                    <p>
                        <strong>*</strong>이용/보관기간 - 고객은 동의를 거부할 수 있으며 동의 거부 시에는 문의하기 서비스 이용이 불가합니다.<br />
                        - 수집한 개인정보는 고객이 파기 요청이 있을 때 까지 보관하면 파기 요청 시 즉시 파기합니다.
                    </p>
                </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <input
                    type="checkbox"
                    id="privacy-agreement"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="privacy-agreement">
                    개인정보 수집 및 이용동의에 동의합니다.
                </label>
            </div>
            {/* <ReCAPTCHA
                sitekey="YOUR_SITE_KEY" // Google reCAPTCHA에서 발급받은 사이트 키로 대체
                onChange={handleCaptchaChange}
            /> */}

            <div className={styles.privacyBtnContainer}>
                <button
                    onClick={handleSubmit}
                    className={styles.privacyBtn}
                    disabled={!isChecked}// || !captchaVerified}
                >
                    문의하기
                </button>
            </div>
        </div>
    )
}

export default Inquire