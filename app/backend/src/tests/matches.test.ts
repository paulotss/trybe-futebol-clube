import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para a rota /matches', () => {
  const mockMatches = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 3,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
    },
    {
      id: 2,
      homeTeam: 9,
      homeTeamGoals: 1,
      awayTeam: 14,
      awayTeamGoals: 1,
      inProgress: false,
    },
  ];

  const mockCreateMatch = {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: true,
  }

  before(async () => {
    sinon.stub(Match, 'findAll').resolves(mockMatches as Match[]);
    sinon.stub(Match, 'create').resolves(mockCreateMatch as Match);
    sinon.stub(Match, 'update').resolves([1, mockMatches as Match[]]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
    (Match.create as sinon.SinonStub).restore();
    (Match.update as sinon.SinonStub).restore();
  })

  it('Teste de retorno para GET', async () => {
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.length(2);
  });

  it('Teste de retorno para GET com filtro inProgress=true', async () => {
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.length(2);
  });

  it('Teste de retorno para GET com filtro inProgress=false', async () => {
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.length(2);
  });

  it('Teste para cadastro de matches com authorization', async () => {
    const login = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });
    const { token } = login.body;
    const response = await chai.request(app).post('/matches').send({
      "homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }).set('authorization', token);
    expect(response.status).to.equal(201);
    expect(response.body.homeTeam).to.equal(16)
  });

  it('Teste para cadastro de matches sem authorization', async () => {
    const response = await chai.request(app).post('/matches').send({
      "homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    });
    expect(response.status).to.equal(401);
  });

  it('Teste para cadastro de matches com times iguais', async () => {
    const login = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });
    const { token } = login.body;
    const response = await chai.request(app).post('/matches').send({
      "homeTeam": 16,
      "awayTeam": 16,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }).set('authorization', token);
    expect(response.status).to.equal(422);
    expect(response.body.message).to.equal('It is not possible to create a match with two equal teams')
  });

  it('Teste para atualizar inProgress de /matches/:id/finish', async () => {
    const response = await chai.request(app).patch('/matches/1/finish');
    expect(response.status).to.equal(200);
    expect(response.body.message).to.be.equal('Finished');
  });

  it('Teste para update de match /:id', async () => {
    const response = await chai.request(app).patch('/matches/1').send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    });
    expect(response.status).to.equal(200);
  })
  
});
