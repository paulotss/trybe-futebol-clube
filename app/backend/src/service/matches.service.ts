import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

const getAllMatches = async () => {
  const matches = await Matches.findAll({ include: [
    { model: Teams, as: 'teamHome', attributes: ['teamName'] },
    { model: Teams, as: 'teamAway', attributes: ['teamName'] },
  ] });
  return { code: 200, payload: matches };
};

export default {
  getAllMatches,
};
