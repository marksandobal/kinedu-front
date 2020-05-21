<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Lista de bebés</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <table class="table table-striped text-left">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cumpleaños</th>
              <th>Madre</th>
              <th>Padre</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="baby in babies" :key="baby.id">
              <td>{{ baby.name }}</td>
              <td>{{ baby.mother_name }}</td>
              <td>{{ baby.father_name }}</td>
              <td>{{ baby.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>

<script>
  import BabyServices from '../../services/babyServices';

  export default {
    data(){
      return {
        babies: [],
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

        BabyServices.getBabies(params).then(response =>{
          self.babies = response.data.babies
        }).catch(error => {
          console.log(error.response.data)
        })
      }
    }
  }
</script>