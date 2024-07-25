import { DataTypes, Model, UUIDV4} from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from 'bcrypt';

class User extends Model {
  async comparePassword(givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
  }
}

User.init({
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
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user
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

export default User;