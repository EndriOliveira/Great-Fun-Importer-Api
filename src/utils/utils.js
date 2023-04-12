const dayjs = require('dayjs');

const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY');
};

const formatHours = (date) => {
  return dayjs(date).format('HH:mm');
};

const formatCpf = (cpf) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const formatPhone = (phone) => {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

module.exports = {
  formatDate,
  formatHours,
  formatCpf,
  formatPhone,
};
