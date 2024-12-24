// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import { pool } from "../query/tableQuery.js";
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { pool, query } = require("../query/tableQuery.js");

async function createUser(req, res) {
    const { user_id, user_password, user_name, admin, job_position } = req.body;
    console.log(user_id, user_password, user_name, admin, job_position);
    
    try {
       // 비밀번호 암호화
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(user_password, salt);

       // 사용자 정보 DB에 저장
       const sql = `
        INSERT INTO UserTable (user_id, user_pw, user_name, admin, job_position)
        VALUES (?, ?, ?, ?, ?);
    `;
        //RETURNING id 이렇게 추가하고 확인차 데이터 가져올수 있음
       const values = [user_id, hashedPassword, user_name, admin, job_position];
       
        const result = await query(sql, values);
       res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error('Error inserting user', err.stack);
        res.status(500).json({ message: 'Error creating user' });
    }
}

async function getUserById(req, res) {
    const id = req.params.id;
    
    try {
        const sql = `
         SELECT * FROM UserTable WHERE user_id = ?;
     `;
         //RETURNING id 이렇게 추가하고 확인차 데이터 가져올수 있음
        
         const result = await query(sql, [id]);
         
        res.status(201).json({ message: 'User created successfully', data: result[0].id });
     } catch (err) {
       console.error('Error check user', err.stack);
         res.status(500).json({ message: 'Error check user' });
     }
}

module.exports = {
    createUser,
    getUserById,
};