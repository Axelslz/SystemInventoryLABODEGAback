import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;

  // 1. Verificamos si el header Authorization existe y empieza con Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2. Obtenemos el token (quitamos la palabra "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verificamos el token con la clave secreta
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Guardamos los datos del usuario en la request
      req.user = decoded;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'No autorizado, token fallido' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No autorizado, no hay token' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de administrador.' });
  }
};