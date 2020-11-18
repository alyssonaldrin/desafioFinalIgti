import http from '../http-common';

const findAll = async (yearMonth) => {
  const response = await http.get(`/api/transaction?period=${yearMonth}`);
  return response.data;
};

const create = async (transaction) => {
  const response = await http.post('/api/transaction', transaction);
  return response.data.id;
};

const update = async (transaction) => {
  const response = await http.put(`/api/transaction`, transaction);
  return response.data;
};

const remove = async (id) => {
  const response = await http.delete(`/api/transaction/${id}`);
  return response.data;
};

const summary = async (yearMonth) => {
  const response = await http.get(`/api/transaction/summary?period=${yearMonth}`);
  return response.data;
}

export default {
  findAll,
  create,
  update,
  remove,
  summary
};
