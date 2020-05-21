import axios from 'axios'

const BASE_URL = 'http://192.168.1.142:3000/api'

const headers = {
  Accept: 'application/vnd.kinedu-api.v1+json',
  'Content-Type': 'application/json'
}

const instance = axios.create({
  timeout: 3000,
  headers: headers
});

export default {
  postToken (user) {

    return instance.post(`${BASE_URL}/sessions`, {
      session: {
        email: user.email,
        password: user.password
      }
    })
  }
}
