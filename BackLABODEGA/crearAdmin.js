import 'dotenv/config'; 
import bcrypt from 'bcryptjs';
import sequelize from './config/db.js'; 
import User from './models/User.js';

const crear = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); 

    const username = 'admin';
    const password = 'password123';

    const existe = await User.findOne({ where: { username } });
    if (existe) {
        console.log('>>> EL USUARIO YA EXISTE. No es necesario crearlo.');
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        await User.create({
          username,
          password: hashedPassword,
          role: 'admin'
        });
        console.log('>>> ¡USUARIO CREADO CON ÉXITO!');
    }

  } catch (error) {
    console.error('Error:', error);
  }
};

crear();