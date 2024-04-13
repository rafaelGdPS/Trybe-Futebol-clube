import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam'
import SequelizeUser from '../database/models/SequelizeUser'
import SequelizeMatch from '../database/models/SequelizeMatch'

import { Response } from 'superagent';
import { mockTeam, mockTeams } from './mock/teamMock';
import userMock from './mock/userMock';
import matchMock from './mock/matchMock';


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
  beforeEach(() => {
    sinon.restore()
  })
  it('Testando login com requisição correta', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(userMock.existUser as any)
    const {body, status} = await chai.request(app).post('/login')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(userMock.validToken);
  })
  it('Testando login/role com requisição correta', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(userMock.existUser as any)
    const {body, status} = await chai.request(app).post('/login/role')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(userMock.existUser.role);
  })
})
describe(' Testando a rota /matches ', function () {
  beforeEach(() => {
    sinon.restore()
  })
  it('testanto se a rota matches Volta todos os resultados ', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchMock.allMatches as any)

    const {body, status} = await chai.request(app).get('/matches')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchMock.allMatches);
  })
}) 
