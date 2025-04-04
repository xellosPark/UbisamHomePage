const { pool, query } = require("../query/tableQuery.js");
const path = require('path');

async function createInquire(req, res) {
    const { data, phone_number } = req.body;
    
    try {
    //     const sql = `
    //     INSERT INTO InquireTable (name, email, phone, tech, title, content)
    //     VALUES (?, ?, ?, ?, ?, ?);
    // `;
    //     //RETURNING id 이렇게 추가하고 확인차 데이터 가져올수 있음
    //    const values = [data.name, data.email, phone_number, data.tech, data.title, data.content];
       
    //     const result = await query(sql, values);
    //     console.log('message: Inquire Insert successfully');
        
    //     res.status(201).json({ message: 'Inquire Insert successfully' });
    const sql = `
      INSERT INTO InquireTable (name, email, phone, tech, title, content)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;

      const values = [data.name, data.email, phone_number, data.tech, data.title, data.content];

      const result = await query(sql, values);
      const insertedId = result.rows[0].id;
      console.log('message: Inquire Insert successfully');

      res.status(201).json({
        message: 'Inquire Insert successfully',
        id: insertedId,
      });
     } catch (err) {
       console.error('Error Insert Inquire', err.stack);
         res.status(500).json({ message: 'Error Insert Inquire' });
     }
}



// 이미지 업로드 처리
async function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: '이미지가 업로드되지 않았습니다.' });
  }
  //const uploadPath = path.join(__dirname, `../../../Storege/Category/Board/${req.file.filename}`);
  //const uploadPath = path.join("http://localhost:8001/Storege/Category/Board", req.file.filename);
  //const filePath = `${req.protocol}://${req.get('host')}/'${uploadPath}`;
  //const filePath = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
  //const filePath = `${uploadPath}\'${req.file.filename}`;
  const filePath = `https://www.ubisam.com/Storege/Category/Board/${req.file.filename}`;
  console.log('반환 path', filePath);
  
  res.json({ imageUrl: filePath }); // 업로드된 이미지 URL 반환
};

module.exports = {
    createInquire,
    uploadImage,
};