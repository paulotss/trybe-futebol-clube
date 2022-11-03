import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UsersModel'

import { Response } from 'superagent';

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

  it('Testes para instâncias de UserModel', () => {
    const user = new Users();
    expect(user).to.be.instanceOf(Users);
  });

  it('Teste para rota /login com user válido', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
	    "password": "secret_admin"
    });
    expect(response.status).to.equal(200);
    expect(response.body).to.haveOwnProperty('token');
  });

  it('Teste para rota /login com user inválido', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "",
	    "password": ""
    });
    expect(response.status).to.equal(400);
    expect(response.body).to.haveOwnProperty('message');
    expect(response.body.message).to.be.equal('All fields must be filled');
  })
});
