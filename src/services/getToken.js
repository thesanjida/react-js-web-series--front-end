const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

module.exports = getToken;
