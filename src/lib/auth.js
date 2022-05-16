// import { useStore } from '../store';

// import { useAxios } from '../axios';
// import { LoginParams, SelfType, SignupParams, useAuthType } from '../types';

export function useAuth() {

    const error = ''
//   const store = useStore();
//   const axios = useAxios();

  function setData (data) {
    store.set('self', data.self);
    store.set('token', data.token);

    if (data.self.theme) {
      if (data.self.theme === 'dark' || data.self.theme === 'light') {
        store.set('theme', data.self.theme);
      } else {
        store.set('theme', 'color');
        store.set('color', data.self.theme);
      }
    }
  };

  function login(loginOptions) {
      const { data, status } = await axios.post('/login', loginOptions);
      
      if (status === 200) {
          setData(data);
        }
        setError(data.message);
    }
  

  async function signup(signupOptions) {
      const { data, status } = await axios.post('/signup', signupOptions);
      if (status === 201) {
        setData(data)
      }
      setError(data.message)
    }


  function logout() {
    store.set('self', null);
    store.set('token', null);
    store.set('page', 'welcome');
  };

  return {
    login,
    signup,
    logout,
    token: store.get('token'),
    self: store.get('self'),
    error,
  };
};