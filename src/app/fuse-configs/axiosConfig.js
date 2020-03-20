import axios from 'axios'

// const api = (process.env.NODE_ENV === 'production') ? 'https://api.m36ng.com/gateway/' : 'http://52.155.167.179/';
// const api = 'https://api.m36ng.com/gateway/';
const api = 'http://52.155.167.179/'

axios.defaults.baseURL = api;
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';