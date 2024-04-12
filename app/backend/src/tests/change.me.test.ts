import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam'
import SequelizeUser from '../database/models/SequelizeUser'

import { Response } from 'superagent';
import { mockTeam, mockTeams } from './mock/teamMock';
import userMock from './mock/userMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração da tabela teams', function () {

beforeEach(() => {
  sinon.restore()
})

  it('Testando o retorno de todos os teams', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(mockTeams as any)

    const {body, status} = await chai.request(app).get('/teams')

    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(mockTeam);

  });
  it('Testando retordo por busca de id', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(mockTeam as any)

    const { body, status } = await chai.request(app).get('/teams/1')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockTeam);
  })

});

describe('Teste de usuarios', function () {
  it('Testando login com requisição correta', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(userMock.existUser as any)
    const {body, status} = await chai.request(app).post('/login')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(userMock.validToken);
  })
})
