<template>
  <div class="container">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <h1>Asistentes</h1>
      </div>
      <div class="col-4"></div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-11 text-left">
        <button class="btn btn-success" v-b-modal.modal-1>
          Agregar
        </button>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-1"> </div>
      <div class="col-10">
        <table class="table table-striped text-left">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Grupo</th>
              <th>Dirección</th>
              <th>Telefono</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="assistant in assistants" :key="assistant.id">
              <td>{{ assistant.name }}</td>
              <td>{{ assistant.group }}</td>
              <td>{{ assistant.address }}</td>
              <td>{{ assistant.phone }}</td>
              <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                <b-button-group>
                  <b-dropdown right text="Acciones" variant="btn">
                    <b-dropdown-item variant="text-danger" @click="edit(assistant)"
                    v-b-modal.modal-1
                    >
                      <span class="text-info">
                        <b-icon-pencil></b-icon-pencil>
                        Editar
                      </span>
                    </b-dropdown-item>
                    <b-dropdown-item
                    v-b-modal.modal-confirmation>
                     <span class="text-danger" @click="edit(assistant)">
                        <b-icon-trash></b-icon-trash>
                        Eliminar
                      </span>
                    </b-dropdown-item>
                  </b-dropdown>
                </b-button-group>
                </div>
              </td>
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
      <div class="col-1"></div>
      <b-modal ref="modal-1" id="modal-1" title="Detalles de Assistente" hide-footer>
        <div class="row">
          <div class="col-12 text-center">
            <b-form @submit="applyCorrespondingAction">
              <b-form-group>
                <b-form-input
                  id="input-2"
                  v-model="assistant.name"
                  required
                  placeholder="Nombre"
                ></b-form-input>
                <br>
                <b-form-input
                  id="input-2"
                  v-model="assistant.group"
                  required
                  placeholder="Grupo"
                ></b-form-input>
                <br>
                <b-form-input
                  id="input-2"
                  v-model="assistant.address"
                  required
                  placeholder="Address"
                ></b-form-input>
                <br>
                <b-form-input
                  type="number"
                  max="10"
                  v-model="assistant.phone"
                  required
                  placeholder="Telefono"
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary">Guardar</b-button>
            </b-form>
          </div>
        </div>
      </b-modal>

      <b-modal ref="modal-confirmation" id="modal-confirmation" title="Confirmación" hide-footer="">
          <p class="my-4 text-center">¿Seguro que desea eliminar el registro?</p>
          <div class="text-center">
            <button type="button" class="btn btn-success" style="margin: 1em" @click="removeAssistant">Aceptar</button>
            <button type="button" class="btn btn-danger" @click="hideConfirmation">Cancelar</button>
          </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import AssistantServices from "../../services/assistantServices";
import messageNotification from "../../assets/notifications/messageNotification";

export default {
  data(){
    return {
      assistants: [],
      currentPage: 1,
      metaPagination: {},
      assistant: {
        id: '',
        name: '',
        group: '',
        address: '',
        phone: ''
      }
    }
  },
  mounted(){
    this.loadTable();
  },
  methods: {
    loadTable(){
      var self = this;
      var params = {
        page: this.currentPage
      }
      AssistantServices.getAssistants(params).then(response => {
        self.assistants = response.data.assistants
        self.metaPagination = response.data.meta.pagination
      })
    },
    callPageNumber(){
      this.loadTable();
    },
    edit(assistant) {
      this.assistant = assistant
    },
    applyCorrespondingAction(evt) {
      evt.preventDefault()
      if(this.assistant.id.length == 0){
        this.saveAssistant()
      }else{
        this.updateAssistant()
      }
    },

    saveAssistant(){
      var self = this;
      AssistantServices.postSaveAssistant(this.assistant).then(response => {
        self.assistant = response.data.assistant
        self.loadTable()
        self.$refs['modal-1'].hide()
        self.clearForm()
        self.toast(
          messageNotification.successTitleSave(),
          messageNotification.successMessageSave(),
          'success'
        )
      }).catch(error =>{
        self.toast(
          messageNotification.errorTitleSave(),
          messageNotification.errorMessageSave(error.response.data),
          'danger'
        )
      })
    },
    updateAssistant() {
      var self = this;
      AssistantServices.putUpdateAssistant(this.assistant).then(response => {
        self.assistant = response.data.assistant
        self.loadTable()
        self.$refs['modal-1'].hide()
        self.clearForm()
        self.toast(
          messageNotification.successTitleUpdate(),
          messageNotification.successMessageUpdate(),
          'success'
        )
      }).catch(error => {
        self.toast(
          messageNotification.errorTitleUpdate(),
          messageNotification.errorMessageUpdate(error.response.data),
          'danger'
        )
      })
    },
    hideConfirmation(){
      this.$refs['modal-confirmation'].hide();
      this.clearForm();
    },
    removeAssistant(){
      var self = this;
      AssistantServices.deleteAssistant(this.assistant).then(response => {
        console.log(response)
        self.loadTable()
        self.$refs['modal-confirmation'].hide()
        self.clearForm()
        self.toast(
          messageNotification.successTitleDelete(),
          messageNotification.successMessagesDelete(),
          'success'
        )
      }).catch(error => {
        self.toast(
          messageNotification.errorTitleDelete(),
          messageNotification.errorMessageDelete(error.response.data),
          'danger'
        )
      })
    },
    clearForm(){
      this.assistant = {
        id: '',
        name: '',
        group: '',
        address: '',
        phone: ''
      }
    },
    toast(title, body,cssClass, toaster, append = false) {
        this.$bvToast.toast(body, {
          title: title,
          variant: cssClass,
          solid: true,
          appendToast: append
        })
      }
  }
}
</script>