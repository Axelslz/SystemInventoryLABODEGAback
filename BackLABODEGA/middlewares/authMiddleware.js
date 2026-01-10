import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const tokenHeader = req.header('Authorization');

  if (!tokenHeader) {
    return res.status(401).json({ message: 'Acceso denegado. Falta token.' });
  }

  try {

    const token = tokenHeader.replace('Bearer ', '');
    
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido o expirado' });
  }
};