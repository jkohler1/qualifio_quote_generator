// quote.test.js
const request = require('supertest');
const axios = require('axios');
const express = require('express');
const router = require('../route/quote');

jest.mock('axios');

const app = express();
app.use('/', router);


describe('GET /', () => {
  describe('Successful Quote Retrieval', () => {
    it('should return a random quote', async () => {
      const mockQuote = {
        content: 'Test quote content',
        author: 'Test author'
      };

      axios.get.mockResolvedValueOnce({ data: [mockQuote] });

      const response = await request(app).get('/');
      console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockQuote);
    });
  });

  describe('Error Handling', () => {
    it('should return 500 if axios request fails', async () => {
      axios.get.mockRejectedValueOnce(new Error('Test error'));

      const response = await request(app).get('/');
      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Une erreur s\'est produite lors de la récupération de la citation' });
    });
  });
});
