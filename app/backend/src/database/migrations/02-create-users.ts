import { Model, QueryInterface, DataTypes } from "sequelize";
import { IUser } from "../../../src/Interfaces/IUser";


export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUser>>( 'users' ,{
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users')
  }
}