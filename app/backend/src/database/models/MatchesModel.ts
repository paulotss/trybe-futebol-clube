import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './team.model';
// import OtherModel from './OtherModel';

class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: INTEGER,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

// Teams.belongsTo(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
// Teams.belongsTo(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

Matches.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matches;
