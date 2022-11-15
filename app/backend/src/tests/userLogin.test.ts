import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UsersModel'

import { Response } from 'superagent';
import { isTypedArray } from 'util/types';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  describe('Testes para rota login', () => {
    it('Testes para instâncias de UserModel', () => {
      const user = new Users();
      expect(user).to.be.instanceOf(Users);
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
        "password": "123456"
      });
      expect(response.status).to.equal(401);
      expect(response.body).to.haveOwnProperty('message');
      expect(response.body.message).to.be.equal('Incorrect email or password');
    });

    it('Teste para login/validate', async () => {
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
    })
  });
  
});
