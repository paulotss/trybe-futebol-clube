import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import { isTypedArray } from 'util/types';
import User from '../database/models/user.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para a rota /login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let response: Response;

  const mockUser = {
    id: 1,
    username: "Admin",
    role: "admin",
    email: "admin@admin.com",
    password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
  }

  before(async () => {
    sinon.stub(User, 'findOne').resolves(mockUser as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  });
  
  it('Teste com user válido', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });
    expect(response.status).to.equal(200);
    expect(response.body).to.haveOwnProperty('token');
  });
  
  it('Teste com dados undefined', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "",
      "password": ""
    });
    expect(response.status).to.equal(400);
    expect(response.body).to.haveOwnProperty('message');
    expect(response.body.message).to.be.equal('All fields must be filled');
  });
  
  it('Teste com email inválido', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "123456",
      "password": "secret_admin"
    });
    expect(response.status).to.equal(401);
    expect(response.body).to.haveOwnProperty('message');
    expect(response.body.message).to.be.equal('Incorrect email or password');
  });

  it('Teste com senha inválida', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "123456"
    });
    expect(response.status).to.equal(401);
    expect(response.body).to.haveOwnProperty('message');
    expect(response.body.message).to.be.equal('Incorrect email or password');
  });

  it('Teste para login/validate com token válido', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });
    const { token } = response.body;
    const responseAuth = await chai.request(app).get('/login/validate')
      .set('authorization', token);
    
    expect(responseAuth.status).to.equal(200);
    expect(responseAuth.body).to.haveOwnProperty('role');
    expect(responseAuth.body.role).to.be.equal('admin');
  });

  it('Teste para login/validate com token inválido', async () => {
    const token = 'invalid_token';
    const responseAuth = await chai.request(app).get('/login/validate')
      .set('authorization', token);
    
    expect(responseAuth.status).to.equal(401);
    expect(responseAuth.body).to.haveOwnProperty('message');
    expect(responseAuth.body.message).to.be.equal('Token must be a valid token');
  });

  it('Teste para login/validate com token inexistente', async () => {
    const responseAuth = await chai.request(app).get('/login/validate');
    expect(responseAuth.status).to.equal(401);
  });
});