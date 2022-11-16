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
  
});
