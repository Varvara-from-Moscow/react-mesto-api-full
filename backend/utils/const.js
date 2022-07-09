const Reg = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;
const validateURL = (value) => {
  if (value !== value.match(Reg).join('')) {
    throw new Error('Ссылка не прошла валидацию');
  }
  return value;
};

module.exports = {
  Reg,
  validateURL,
};
