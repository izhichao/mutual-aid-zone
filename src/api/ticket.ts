import instance from '../utils/request';

export const getTickets = () => {
  return instance.get('/api/ticket');
};

export const createTicket = (question: string) => {
  return instance.post('/api/ticket/question', { question });
};
