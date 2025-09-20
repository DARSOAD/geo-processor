import request from 'supertest';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const http = request(BASE_URL);

describe('Geo-Processor Gateway (running instance)', () => {
  const jitter = Number((Math.random() * 0.0001).toFixed(6));
  const validBody = {
    points: [
      { lat: 0 + jitter, lng: 0 + jitter },
      { lat: 10 + jitter, lng: 10 + jitter },
    ],
  };

  it('POST /api/python/process → MISS, then HIT, y REFRESH', async () => {
    const miss = await http
      .post('/api/python/process')
      .set('Content-Type', 'application/json')
      .send(validBody)
      .expect(201);

    expect(miss.body).toHaveProperty('fromCache', false);
    expect(miss.body).toHaveProperty('centroid');
    expect(miss.body).toHaveProperty('bounds');

    const hit = await http
      .post('/api/python/process')
      .set('Content-Type', 'application/json')
      .send(validBody)
      .expect(201);

    expect(hit.body).toHaveProperty('fromCache', true);
    expect(hit.body).toHaveProperty('centroid');
    expect(hit.body).toHaveProperty('bounds');

    const refresh = await http
      .post('/api/python/process?refresh=true')
      .set('Content-Type', 'application/json')
      .send(validBody)
      .expect(201);

    expect(refresh.body).toHaveProperty('fromCache', false);
  });

  it('POST /api/python/process → 400 con body inválido', async () => {
    const invalidBody = {
      points: [
        { lat: 1000, lng: 0 },
        { lat: 0, lng: 0 },
      ],
    };

    await http
      .post('/api/python/process')
      .set('Content-Type', 'application/json')
      .send(invalidBody)
      .expect(400);
  });
});
