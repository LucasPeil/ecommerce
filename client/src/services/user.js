import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? import.meta.env.BASE_URL + '/api/users/'
    : '/api/users/';

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', {
    ...userData,
  });

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const resetPassword = async (newPassword, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, newPassword, config);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
const createUser = async (data) => {
  const mutation = `mutation createUser($user: UserInput) {
    createUser(user: $user) {
     status
    message
    data {
      id
      name
      username 
      email
      orders
      cart
    }  
    }
 
  } `;
  const dataToSend = JSON.stringify({
    query: mutation,
    variables: { user: data },
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(dataToSend);
  const response = await axios.post(API_URL, dataToSend, config);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  localStorage.removeItem('user');
};

const forgotPassword = async (body) => {
  const response = await axios.post(API_URL, body);

  return response.data;
};

const verifyCode = async (body) => {
  const response = await axios.post(API_URL, body);

  return response.data;
};

const authServices = {
  login,
  logout,
  resetPassword,
  forgotPassword,
  createUser,
  verifyCode,
};

export default authServices;
