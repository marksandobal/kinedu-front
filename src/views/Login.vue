<template>
  <div class="container">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <h2>Bienvenido al Sistema de actividades Kinedu</h2>
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <div class="card" style="background-color: #1b75bb">
          <div class="card-body">
            <div class="card-title" style="color: white">Iniciar sessión</div>
            <b-form  @submit="submitForm">
                <b-form-input
                  id="input-1"
                  v-model="sessionForm.email"
                  type="email"
                  required
                  placeholder="Email"
                ></b-form-input>
                <br>
              <b-form-group id="input-group-2">
                <b-form-input
                  id="input-2"
                  v-model="sessionForm.password"
                  required
                  placeholder="Password"
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" ariant="btn btn-light">
              Iniciar
              </b-button>
            </b-form>
          </div>
        </div>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import loginServices from '../services/loginServices';

export default {
  name: "Login",
  components: {},
  data () {
    return {
      sessionForm: {
        email: "",
        password: "",
        message: ""
      },
      token: "",
      result: {}
    }
  },
  methods: {
    ...mapActions(["save_session"]),
    submitForm (evt) {
        evt.preventDefault()
         loginServices.postToken(this.sessionForm).then(response => (
          this.save_session_store(response.data.session.token)
          )).catch(error => {
            console.log(error.response.data)
          })
    },
    save_session_store (token) {
      this.save_session(token)
    },
  }
}
</script>