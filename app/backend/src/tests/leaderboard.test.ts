import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match.model';
import Team from '../database/models/team.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração para rota /leaderboard', () => {
  const mockMatches = [
    {
      id: 1,
      homeTeam: 1,
      homeTeamGoals: 3,
      awayTeam: 2,
      awayTeamGoals: 1,
      inProgress: false,
    },
    {
      id: 2,
      homeTeam: 3,
      homeTeamGoals: 1,
      awayTeam: 4,
      awayTeamGoals: 1,
      inProgress: false,
    },
  ];

  const mockTeams = [
    {
      id: 1,
      teamName: 'Flamengo',
    },
    {
      id: 2,
      teamName: 'Santos',
    },
    {
      id: 3,
      teamName: 'São Paulo',
    },
    {
      id: 4,
      teamName: 'Fluminense',
    }
  ]

  before(async () => {
    sinon.stub(Match, 'findAll').resolves(mockMatches as Match[]);
    sinon.stub(Team, 'findAll').resolves(mockTeams as Team[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('Teste de retorno para /leaderboard', async () => {
    const response = await chai.request(app).get('/leaderboard');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.length(4);
  });

  it('Teste de retorno para /leaderboard/home', async () => {
    const response = await chai.request(app).get('/leaderboard/home');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.length(4);
  });

  it('Teste de retorno para /leaderboard/away', async () => {
    const response = await chai.request(app).get('/leaderboard/away');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.length(4);
  });
});
