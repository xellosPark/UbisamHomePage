import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
//import { connection } from '../query/tableQuery.js';

let users = [
    { id: '1111', pw: '2222' },
    { id: '2', pw: '2222' },
];

let userDatas = [
    { id: '1111', user_name: 'John Doe', role: 'admin' },
    { id: '2', user_name: '이수정', role: 'user' },
];

// Access Token 생성 함수
const generateAccessToken = (user) => {
    return jwt.sign({ user }, 'ubisam7788', { expiresIn: '30s' });  // 15분 유효기간
};

// Refresh Token 생성 함수
const generateRefreshToken = (user) => {
    return jwt.sign({ user }, 'ubisam7788', { expiresIn: '1m' });  // 7일 유효기간
};

// 로그인 처리 함수
export async function login(req, res) {
    const { user_id, user_password } = req.body;
    console.log('로그인 진행', user_id, user_password);


    const exists = users.some(user => user.id === user_id && user.pw === user_password);

    if (exists) {
        console.log(`User with ID ${user_id} and PW ${user_password} exists.`);
    } else {
        console.log(`User with ID ${user_id} and PW ${user_password} does not exist.`);
        return res.status(500).json({ message: 'Error logging in' });
    }

    const loggedInUser = userDatas.find(user => user.id === user_id);
    const userData = { user_id: user_id, user_name: loggedInUser.user_name, role: loggedInUser.role };

    // Access Token과 Refresh Token 생성
    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(userData);

    // 로그인 성공
    res.status(200).json({ message: 'Login successful', accessToken, refreshToken, userData });
    return


    try {
        // 사용자 이름으로 데이터베이스에서 사용자 찾기
        const query = `SELECT * FROM "UserTable" WHERE user_id = $1`;
        const result = await client.query(query, [user_id]);

        if (result.rows.length === 0) {
            // 사용자가 없으면 에러 응답
            return res.status(400).json({ message: 'User not found' });
        }

        const user = result.rows[0];

        // 데이터베이스에 저장된 비밀번호와 입력된 비밀번호 비교
        const isMatch = await bcrypt(user_password, user.user_password);

        if (!isMatch) {
            // 비밀번호가 일치하지 않으면 에러 응답
            return res.status(400).json({ message: 'Invalid password' });
        }

        const userData = { user_id: user_id, user_name: user.user_name, role: user.role };

        // Access Token과 Refresh Token 생성
        const accessToken = generateAccessToken(userData);
        const refreshToken = generateRefreshToken(userData);

        // 로그인 성공
        res.status(200).json({ message: 'Login successful', accessToken, refreshToken, userData });

    } catch (error) {
        console.error('Error logging in', error.stack);
        res.status(401).json({ message: 'Error logging in' });
    }
}

// Refresh Token을 통해 새로운 Access Token 발급
export function refreshToken(req, res) {
    const { refreshToken } = req.body;
    
    try {
        const decoded = jwt.verify(refreshToken, 'ubisam7788'); //'REFRESH_SECRET'
        
        const newAccessToken = jwt.sign({ id: decoded.id }, 'ubisam7788', { expiresIn: '30s' }); //'ACCESS_SECRET'
    
        const newAccessTokenExp = new Date().getTime() + 30 * 1000; // 15분 후
    
        res.status(200).json({ accessToken: newAccessToken, accessTokenExp: newAccessTokenExp });
      } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token' });
      }
}

// 로그아웃 처리 함수 (Refresh Token 제거)
export function logout(req, res) {
    const { token } = req.body;
    res.status(204).send();
}


export function Test(req, res) {
    res.status(200).json({data: 'test 진행'});
}