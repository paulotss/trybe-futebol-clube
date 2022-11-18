import Team from '../database/models/team.model';
import Match from '../database/models/match.model';
import { Payload } from '../interfaces';

class MatchService {
  private matches: Match[];
  private _code: number;
  private payload: Payload;
  private _ht: number;
  private _at: number;
  private _htg: number;
  private _atg: number;

  public get code(): number {
    return this._code;
  }

  public set ht(v: number) {
    this._ht = v;
  }

  public set at(v: number) {
    this._at = v;
  }

  public set htg(v: number) {
    this._htg = v;
  }

  public set atg(v: number) {
    this._atg = v;
  }

  public async getAllMatches() {
    this.matches = await Match.findAll({ include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ] });
    this._code = 200;
    return this.matches;
  }

  public async getByInProgress(val: string) {
    this.matches = await Match.findAll(
      { where: { inProgress: val === 'true' ? 1 : 0 },
        include: [
          { model: Team, as: 'teamHome', attributes: ['teamName'] },
          { model: Team, as: 'teamAway', attributes: ['teamName'] },
        ] },
    );
    this._code = 200;
    return this.matches;
  }

  public async insertMatch() {
    if (this._ht === this._at) {
      this._code = 422;
      return { message: 'It is not possible to create a match with two equal teams' };
    }
    if (!await this.verifyTeam()) {
      this._code = 404;
      return { message: 'There is no team with such id!' };
    }
    const match = await Match.create({
      homeTeam: this._ht,
      awayTeam: this._at,
      homeTeamGoals: this._htg,
      awayTeamGoals: this._atg,
      inProgress: 1,
    });
    this._code = 201;
    return match;
  }

  public async updateMatchInProgress(id: number) {
    await Match.update({ inProgress: 0 }, { where: { id } });
    this._code = 200;
    this.payload = { message: 'Finished' };
    return this.payload;
  }

  public async updateMatch(id: number) {
    await Match.update(
      { homeTeamGoals: this._htg, awayTeamGoals: this._atg },
      { where: { id } },
    );
    this._code = 200;
    this.payload = { message: 'Updated' };
    return this.payload;
  }

  private async verifyTeam() {
    const team1 = await Team.findByPk(this._ht);
    const team2 = await Team.findByPk(this._at);
    if (!team1 || !team2) return false;
    return true;
  }
}

export default MatchService;
