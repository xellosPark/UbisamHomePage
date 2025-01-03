const { pool, query } = require("../query/tableQuery.js");

async function createInquire(req, res) {
    const { data, phone_number } = req.body;
    
    try {
        const sql = `
        INSERT INTO InquireTable (name, email, phone, tech, title, content)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
        //RETURNING id 이렇게 추가하고 확인차 데이터 가져올수 있음
       const values = [data.name, data.email, phone_number, data.tech, data.title, data.content];
       
        const result = await query(sql, values);
        console.log('message: Inquire Insert successfully');
        
        res.status(201).json({ message: 'Inquire Insert successfully' });
     } catch (err) {
       console.error('Error Insert Inquire', err.stack);
         res.status(500).json({ message: 'Error Insert Inquire' });
     }
}




module.exports = {
    createInquire,
};