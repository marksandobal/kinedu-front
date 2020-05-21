<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Lista de Actividades</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <table class="table table-striped text-left">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="activity in activities" :key="activity.id">
              <td>{{ activity.name }}</td>
              <td>{{ activity.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>

<script>
  import ActivityServices from '../../services/activityServices';

  export default {
    data(){
      return {
        activities: [],
        metaPagination: {},
        currentPage: 1
      }
    },
    mounted(){
      this.loadTable();
    },
    methods:{
      loadTable(){
        var self = this;
        var params = {
          page: this.currentPage
        }

        ActivityServices.getActivities(params).then(response =>{
          self.activities = response.data.activities
          console.log(self.activities)
        }).catch(error => {
          console.log(error.response.data)
        })
      }
    }
  }
</script>