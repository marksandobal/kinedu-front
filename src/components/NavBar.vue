<template>
<div v-if="user_exists">
  <b-navbar class="navbar navbar-expand-lg navbar-light bg-info text-light" toggleable="lg" type="light" variant="info">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <router-link class="nav-link" to="/u/logs">Log de Actividades</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="nav-link" to="/u/assistants">Asistentes</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="nav-link" to="/u/babies">Bebes</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="nav-link" to="/u/activities">Actividades</router-link>
        </b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>{{ current_user.email}}</em>
          </template>
          <b-dropdown-item @click="destroy_session()">Cerrar Sesión</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "NavBar",
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['destroy_session'])
  },
  computed: {
    ...mapGetters(['user_exists']),
    ...mapState(['current_user'])
  }
}
</script>
<style>
#nav a.router-link-exact-active {
  color: #ffff !important;
}
</style>