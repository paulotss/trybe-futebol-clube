import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: INTEGER,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'team',
  timestamps: false,
  tableName: 'teams',
});

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Team;
