import Teams from '../database/models/TeamsModel';

const getTeams = async () => {
  const teams = await Teams.findAll();
  return { code: 200, payload: teams };
};

const getOneTeam = async (id: number) => {
  const team = await Teams.findByPk(id);
  return { code: 200, payload: team };
};

export default {
  getTeams,
  getOneTeam,
};
