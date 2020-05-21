<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h3>Log de actividades</h3>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-3">
        <select class="custom-select" v-model="selected.baby">
          <option v-for="baby in babies" v-bind:key="baby.id" v-bind:value="baby.id">
            {{ baby.name }}
          </option>
        </select>
      </div>
      <div class="col-3">
        <select class="custom-select" v-model="selected.assistant">
          <option v-for="assistant in assistants" v-bind:key="assistant.id" v-bind:value="assistant.id">
            {{ assistant.name }}
          </option>
        </select>      </div>
      <div class="col-3">
        <b-form-select v-model="selected.status" :options="status"></b-form-select>
      </div>
      <div class="col-3">
        <button type="button" class="btn btn-info" @click="filter">
          <b-icon-search></b-icon-search>
          filter</button>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-12">
        <table class="table table-striped text-left" id="table">
          <thead>
            <tr>
              <th>Bebé</th>
              <th>Asistente</th>
              <th>Actividad</th>
              <th>Inicio</th>
              <th>Estatus</th>
              <th>Duracion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in activity_logs" :key="item.id">
              <td>{{ item.baby.name }}</td>
              <td>{{ item.assistant.name }}</td>
              <td>{{ item.activity.name }}</td>
              <td>{{ item.start_time | formatDate }}</td>
              <td>
                <span v-if="item.stop_time == null">
                  En proceso
                </span>
                <span v-else>
                  Terminada
                </span>
              </td>
              <td>{{ item.duration }}</td>
            </tr>
          </tbody>
        </table>
        <b-pagination
          v-model="currentPage"
          :total-rows="metaPagination.total_count"
          :per-page="metaPagination.limit_value"
          aria-controls="my-table"
          @input="callPageNumber"
          align="center"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ActivityLogServices from '../../services/activityLogServices';
import BabyServices from '../../services/babyServices';
import assistantServices from '../../services/assistantServices';

export default {
  data() {
    return {
      selected: {
        baby: null,
        assistant: null,
        status: null
      },
      babies: [],
      assistants: [],
      status: [
        { value: null, text: 'Seleccione un Estatus' },
        { value: 'in_progress', text: 'En progreso' },
        { value: 'finished', text: 'Terminado' },
        { value: 'all', text: 'Todos' }
      ],
      activity_logs: [],
      metaPagination: {},
      currentPage: 1
    }
  },
  mounted(){
    this.getActivityLogs();
    this.getBabies();
    this.getAssistants();
  },
  methods: {
    callPageNumber(){
      this.getActivityLogs();
    },
    getActivityLogs(){
      var self = this;
      var params = {
        page: this.currentPage
      }

      ActivityLogServices.getActivityLogs(params).then(response => {
        self.activity_logs = response.data.activity_logs
        self.metaPagination = response.data.meta.pagination
      }).catch(error => {
        console.log(error.response.data)
      })
    },
    getBabies(){
      var self = this;
      BabyServices.getBabies().then(response => {
        self.babies = response.data.babies
        self.babies.unshift({ id: null, name: 'Seleccionar bebé' });
      }).catch(error => {
        console.log(error.response.data)
      })
    },
    getAssistants(){
      var self = this;
      assistantServices.getAssistants().then(response => {
        self.assistants = response.data.assistants
        self.assistants.unshift({ id: null, name: 'Seleccionar asistente' });
      })
    },
    filter(){
      var self = this;
      var params = {
        page: this.currentPage,
        assistant: this.selected.assistant,
        baby: this.selected.baby,
        status: this.selected.status
      }

      ActivityLogServices.getActivityLogs(params).then(response => {
        self.activity_logs = response.data.activity_logs
        self.metaPagination = response.data.meta.pagination
      }).catch(error => {
        console.log(error.response.data)
      })
    }
  }
}
</script>