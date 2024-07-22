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
  

export async function initDatabase() {
  try {
    await sequelize.sync();
    console.log('Tables have been created');
  } catch (error) {
    console.error('Unable to create tables:', error);
    throw error;
  }
}

export default sequelize;
