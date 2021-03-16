export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    const currentUser = store.getters['auth/currentUser'];
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      Authentication: `Bearer ${currentUser.stsTokenManager.accessToken}`
    };
    return config;
  });
}
