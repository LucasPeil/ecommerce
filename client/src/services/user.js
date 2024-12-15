import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? import.meta.env.BASE_URL + '/api/users/'
    : '/api/users/';

const login = async (data) => {
  const mutation = `mutation createUser($user: UserInput) {
    login(user: $user) {
     status
    message
    data {
      id
      username 
      email
      orders{
        products{
         name
         images
        }
        total 
      }
      cart{
        name
        images
      }
    }  
    }
 
  } `;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const dataToSend = JSON.stringify({
    query: mutation,
    variables: { user: data },
  });
  const response = await axios.post(API_URL, dataToSend, config);

  if (response?.data?.data?.login?.data) {
    localStorage.setItem(
      'user',
      JSON.stringify(response?.data?.data?.login?.data)
    );
  }
  return response?.data?.data?.login;
};

const resetPassword = async (newPassword, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, newPassword, config);

  if (response.data) {
    localStorage.setItem(
      'user',
      JSON.stringify(response?.data?.data?.createUser?.data)
    );
  }
  return response?.data?.data?.createUser?.data;
};
const createUser = async (data) => {
  const mutation = `mutation createUser($user: UserInput) {
    createUser(user: $user) {
     status
    message
    data {
      id
      username 
      email
      orders{
        products{
         name
         images
        }
        total 
      }
      cart{
        name
        images
      }
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

  const response = await axios.post(API_URL, dataToSend, config);
  if (response.data) {
    localStorage.setItem(
      'user',
      JSON.stringify(response?.data?.data?.createUser?.data)
    );
  }

  return response?.data?.data?.createUser?.data;
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
