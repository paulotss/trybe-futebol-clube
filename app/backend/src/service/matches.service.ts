import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

const getAllMatches = async () => {
  const matches = await Matches.findAll({ include: [
    { model: Teams, as: 'teamHome', attributes: ['teamName'] },
    { model: Teams, as: 'teamAway', attributes: ['teamName'] },
  ] });
  return { code: 200, payload: matches };
};

const getByInProgress = async (val: string) => {
  const matches = await Matches.findAll(
    { where: { inProgress: val === 'true' ? 1 : 0 },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ] },
  );
  return { code: 200, payload: matches };
};

const insertMatch = async (
  homeTeam: string,
  awayTeam: string,
  homeTeamGoals: string,
  awayTeamGoals: string,
) => {
  if (homeTeam === awayTeam) {
    return { code: 422,
      payload: { message: 'It is not possible to create a match with two equal teams' },
    };
  }
  const match = await Matches.create({
    homeTeam: Number(homeTeam),
    awayTeam: Number(awayTeam),
    homeTeamGoals: Number(homeTeamGoals),
    awayTeamGoals: Number(awayTeamGoals),
    inProgress: 1,
  });
  return { code: 201, payload: match };
};

const updateMatchInProgress = async (id: number) => {
  await Matches.update({ inProgress: 0 }, { where: { id } });
  return { code: 200, payload: { message: 'Finished' } };
};

export default {
  getAllMatches,
  getByInProgress,
  insertMatch,
  updateMatchInProgress,
};
