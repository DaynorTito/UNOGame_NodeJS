import { DataTypes, Model, UUIDV4} from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from 'bcrypt';

class UserPlayer extends Model {
  async comparePassword(givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserPlayer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del usuario generado automáticamente.
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         username:
 *           type: string
 *           description: Nombre de usuario único.
 *           example: johndoe
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario.
 *           example: johndoe@example.com
 *         age:
 *           type: integer
 *           description: Edad del usuario. Este campo es opcional.
 *           example: 25
 *         password:
 *           type: string
 *           description: Contraseña del usuario (en texto cifrado en la base de datos).
 *           example: $2b$10$WzR.sI0k1pP7UO/0mZbM2Oee2Tj2C/RbMJJSZI8lx/DVFl9fajp7G
 *       required:
 *         - username
 *         - email
 *         - password
 *       additionalProperties: false
 */
UserPlayer.init({
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'UserPlayer',
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
});

export default UserPlayer;