import instance from '../utils/request';

export const getTickets = () => {
  return instance.get('/ticket');
};

export const createTicket = (question: string) => {
  return instance.post('/ticket/question', { question });
};
