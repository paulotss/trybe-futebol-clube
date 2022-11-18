import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para a rota /teams', () => {
  const mockTeams = [
    {
      id: 1,
      teamName: "Avaí/Kindermann"
    },
    {
      id: 2,
      teamName: "Bahia"
    },
    {
      id: 3,
      teamName: "Botafogo"
    },
  ];

  const mockTeam = {
    id: 1,
    teamName: "Avaí/Kindermann"
  };

  before(async () => {
    sinon.stub(Team, 'findAll').resolves(mockTeams as Team[]);
    sinon.stub(Team, 'findByPk').resolves(mockTeam as Team);
  }); 

  after(() => {
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findByPk as sinon.SinonStub).restore();
  });

  it('Teste de retorno para GET', async () => {
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.length(3);
  });

  it('Teste de retorno para GET por id', async () => {
    const response = await chai.request(app).get('/teams/1');
    expect(response.status).to.equal(200);
    expect(response.body).to.haveOwnProperty('teamName');
    expect(response.body).to.haveOwnProperty('id');
  });

  it('Teste de retorno para GET por id inexistente', async () => {
    (Team.findByPk as sinon.SinonStub).restore();
    sinon.stub(Team, 'findByPk').resolves(null);

    const response = await chai.request(app).get('/teams/1');
    expect(response.status).to.equal(404);
    expect(response.body).to.haveOwnProperty('message');
    expect(response.body.message).to.be.equal('Not Found');
  });
});
