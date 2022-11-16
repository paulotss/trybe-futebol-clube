import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UsersModel';
import Matches from '../database/models/TeamsModel';

import { Response } from 'superagent';
import { isTypedArray } from 'util/types';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para a rota /matches', () => {
    
  it('Testes para instâncias de UserModel', () => {
    const teams = new Matches();
    expect(teams).to.be.instanceOf(Matches);
  });

  it('Teste de retorno para GET', async () => {
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.equal(200);
    expect(response.body[0]).to.haveOwnProperty('teamHome');
    expect(response.body[0]).to.haveOwnProperty('teamAway');
  });

  it('Teste de retorno para GET com filtro inProgress=true', async () => {
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.equal(200);
    expect(response.body[0]).to.haveOwnProperty('teamHome');
    expect(response.body[0]).to.haveOwnProperty('teamAway');
  });

  it('Teste de retorno para GET com filtro inProgress=false', async () => {
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.equal(200);
    expect(response.body[0]).to.haveOwnProperty('teamHome');
    expect(response.body[0]).to.haveOwnProperty('teamAway');
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

  it('Teste para atualizar inProgress de /matches/:id/finish', async () => {
    const response = await chai.request(app).patch('/matches/:id/finish');
    expect(response.status).to.equal(200);
    expect(response.body.message).to.be.equal('Finished');
  })
  
});
