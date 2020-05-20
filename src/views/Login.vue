<template>
  <div>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <form>
              <div class="form-group">
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
//import loginServices from '../services/loginServices'

export default {
  name: 'Login',
  components: {},
  data () {
    return {
      sessionForm: {
        email: '',
        password: '',
        message: ''
      },
      token: '',
      result: {}
    }
  },
  methods: {
    ...mapActions(['save_session']),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        // if (valid) {
        //   loginServices.postToken(this.sessionForm).then(response => (
        //     this.save_session_store(response.headers.authorization)
        //   )).catch(error => {
        //     console.log(error)
        //   })
        // } else {
        //   alert('Invalid Data')
        //   return false
        // }
      })
    },
    logOutSession () {
      loginServices.deleteSession().then(response => {
        this.destroy_session_store()
      }).catch(error => {
        console.log(error)
      })
    },
    save_session_store (token) {
      this.save_session(token)
    },
    destroy_session_store () {
      this.destroy_session()
    }
  }
}
</script>