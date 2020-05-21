import axios from 'axios';

const BASE_URL = 'http://192.168.1.142:3000/api'

const headers = {
  Accept: 'application/vnd.kinedu-api.v1+json',
  Authorization: localStorage.getItem('token'),
  'Content-Type': 'application/json'
}

const instance = axios.create({
  timeout: 3000,
  headers: headers
});

export default {
  getAll (route, params) {
    return instance.get(`${BASE_URL}/${route}`, {params})
  },
  get (route, id) {
    return instance.get(`${BASE_URL}/${route}/${id}`)
  },
  post (route, data) {
    return instance.post(`${BASE_URL}/${route}`, data)
  },
  put (route, data) {
    return instance.put(`${BASE_URL}/${route}`, data)
  },
  delete (route) {
    return instance.delete(`${BASE_URL}/${route}`)
  }
}