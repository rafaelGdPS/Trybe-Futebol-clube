import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam'
import SequelizeUser from '../database/models/SequelizeUser'
import SequelizeMatch from '../database/models/SequelizeMatch'

import { mockTeam, mockTeams } from './mock/teamMock';
import userMock from './mock/userMock';
import matchMock from './mock/matchMock';
import Validations from '../middlewares/loginValidation';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração da tabela teams', function () {

  it('Testando o retorno de todos os teams', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(mockTeams as any)

    const {body, status} = await chai.request(app).get('/teams')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockTeams);

  });
  it('Testando retordo por busca de id', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(mockTeam as any);
    sinon.stub(Validations, 'validationsLogin')

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
  it('testando matches nao retornar nada', async function () {
    
    
    sinon.stub(SequelizeMatch, 'findByPk').resolves(null);
   
    const { status, body } = await chai.request(app).get('/matches/1')

    expect(status).to.equal(404)
    expect(body.message).to.deep.equal('Match is not in progress')

  })
  it('testanto se a rota matches cria nova match ', async function () {
    sinon.stub(SequelizeMatch, 'create').resolves(matchMock.newMatch as any);

    const {body, status} = await chai.request(app).post('/matches').send(matchMock.validRequest)

    expect(status).to.equal(201);
    expect(body).to.deep.equal(matchMock.newMatch);
  })
  it('testanto se a rota matches ao receber dados invalidos nao cria nova match ', async function () {


    const {body, status} = await chai.request(app).post('/matches').send(matchMock.invalidRequest)

    expect(status).to.equal(400);
    expect(body.message).to.equal({ message: 'It is not possible to create a match with two equal teams' });
  })
  describe('Testando rota /leaderboard', function () {
    it('Testando a rota /leaderboard/home', async function () {
    

      const {status, body} = await chai.request(app).get('/leaderboard/home')
      expect(status).to.equal(200);
      

    })
  })
}) 
