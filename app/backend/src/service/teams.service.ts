import Teams from '../database/models/TeamsModel';

const getTeams = async () => {
  const teams = await Teams.findAll();
  return { code: 200, payload: teams };
};

export default {
  getTeams,
};
