import { Payload } from '../interfaces';
import Team from '../database/models/team.model';

class TeamService {
  private teams: Team[];
  private team: Team | null;
  private _code: number;
  private payload: Payload;

  constructor() {
    this._code = 500;
    this.payload = { message: 'Internal Error' };
  }

  public get code(): number {
    return this._code;
  }

  public async getAllTeams() {
    this.teams = await Team.findAll();
    this._code = 200;
    return this.teams;
  }

  public async getOneTeam(id: number) {
    this.team = await Team.findByPk(id);
    if (!this.team) {
      this._code = 404;
      this.payload = { message: 'Not Found' };
      return this.payload;
    }
    this._code = 200;
    return this.team;
  }
}

export default TeamService;
