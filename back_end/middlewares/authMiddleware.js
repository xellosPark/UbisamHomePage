const jwt = require('jsonwebtoken');

function verifyAccessToken(req, res, next) {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
      console.log('header에 토큰이 없음');
      return res.status(401).json({ message: 'No token provided' });
    }
  
    const token = authHeader.split(' ')[1];
    try {
      // 토큰 검증
      const decoded = jwt.verify(token, 'ubisam7788', { clockTolerance: 10 }); // ACCESS_SECRET
      req.user = decoded; // 검증 성공 시 decoded 값 저장
      next();
    } catch (err) {
      console.error('Token verification error:', err.message);
      return res.status(401).json({ message: 'Access token expired or invalid' });
    }
  };

  module.exports = {
    verifyAccessToken,
  };