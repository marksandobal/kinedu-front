import ApiServices from '../services/defualtServices'

export default {
  postToken (user) {
    return ApiServices.post('sessions', {
      session: {
        email: user.email,
        password: user.password
      }
    })
  }
}
