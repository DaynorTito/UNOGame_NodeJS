import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    }
);
  

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection established successfully');
    } catch (error) {
      console.error('Unable to connect to the Database:', error);
    }
  })();

export default sequelize;
