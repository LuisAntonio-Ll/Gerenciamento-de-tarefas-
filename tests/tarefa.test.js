// tests/tarefa.test.js
const request = require('supertest');
const criarApp = require('../src/app');
const sequelize = require('../src/infrastructure/database/connection');

require('../src/infrastructure/database/models/UsuarioModel');
require('../src/infrastructure/database/models/TarefaModel');

const app = criarApp();

beforeAll(async () => {
  // Recria o banco do zero antes de rodar a suíte de testes
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Roteiro de testes - Fase 7', () => {
  let usuarioId;
  let tarefaId;

  // 1. POST: Criação de um usuário válido
  test('deve criar um usuário válido', async () => {
    const resposta = await request(app)
      .post('/usuarios')
      .send({ nome: 'João', email: 'joao@teste.com' });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toHaveProperty('id');
    usuarioId = resposta.body.id;
  });

  // 2. POST: Criação de uma ou mais tarefas vinculadas a esse usuário
  test('deve criar uma tarefa vinculada ao usuário', async () => {
    const resposta = await request(app)
      .post('/tarefas')
      .send({ titulo: 'Estudar Clean Architecture', usuarioId });

    expect(resposta.status).toBe(201);
    expect(resposta.body.status).toBe('PENDENTE');
    expect(resposta.body.usuarioId).toBe(usuarioId);
    tarefaId = resposta.body.id;
  });

  // 3. GET: Listagem geral de todas as tarefas cadastradas no banco
  test('deve listar todas as tarefas cadastradas', async () => {
    const resposta = await request(app).get('/tarefas');

    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
    expect(resposta.body.length).toBeGreaterThanOrEqual(1);
  });

  // 4. POST (Regra de Negócio): iniciar tarefa + bloqueio na sexta tarefa
  test('deve iniciar a tarefa e mudar o status para EM_ANDAMENTO', async () => {
    const resposta = await request(app).post(`/tarefas/${tarefaId}/iniciar`);

    expect(resposta.status).toBe(200);
    expect(resposta.body.status).toBe('EM_ANDAMENTO');
  });

  test('deve bloquear a sexta tarefa em andamento do mesmo usuário', async () => {
    // Já existe 1 tarefa EM_ANDAMENTO (a de cima). Cria + inicia mais 4 (total 5 OK).
    for (let i = 0; i < 4; i += 1) {
      const criada = await request(app)
        .post('/tarefas')
        .send({ titulo: `Tarefa extra ${i}`, usuarioId });
      await request(app).post(`/tarefas/${criada.body.id}/iniciar`);
    }

    // A sexta deve ser bloqueada
    const sexta = await request(app)
      .post('/tarefas')
      .send({ titulo: 'Tarefa que deve ser bloqueada', usuarioId });

    const respostaBloqueio = await request(app).post(`/tarefas/${sexta.body.id}/iniciar`);

    expect(respostaBloqueio.status).toBe(400);
    expect(respostaBloqueio.body.erro).toMatch(/Limite de 5 tarefas em andamento/);
  });

  // 5. PUT & DELETE: alterar o texto e depois apagar do banco
  test('deve atualizar o título da tarefa', async () => {
    const resposta = await request(app)
      .put(`/tarefas/${tarefaId}`)
      .send({ titulo: 'Título atualizado' });

    expect(resposta.status).toBe(200);
    expect(resposta.body.titulo).toBe('Título atualizado');
  });

  test('deve apagar a tarefa do banco de dados', async () => {
    const resposta = await request(app).delete(`/tarefas/${tarefaId}`);
    expect(resposta.status).toBe(204);

    const buscaAposDelete = await request(app).get('/tarefas');
    const idsRestantes = buscaAposDelete.body.map((t) => t.id);
    expect(idsRestantes).not.toContain(tarefaId);
  });
});
