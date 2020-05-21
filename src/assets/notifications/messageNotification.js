export default {
  successTitleSave(){
    return 'Guardado!'
  },
  successMessageSave(){
    return 'Se ha guardado el registro.'
  },
  successTitleUpdate(){
    return 'Actualizado!'
  },
  successMessageUpdate(){
    return 'Se ha actualizado el registro con exito.'
  },
  successTitleDelete(){
    return 'Eliminado!'
  },
  successMessagesDelete(){
    return 'Se ha eliminado el registro.'
  },
  errorTitleSave(){
    return 'Error al guardar!'
  },
  errorMessageSave(errors){
    return `Error al intentar guardar el registro. ${errors}`
  },
  errorTitleUpdate(){
    return 'Error al actualizar!'
  },
  errorMessageUpdate(errors){
    return `Error al intentar actualizar el registro. ${errors}`
  },
  errorTitleDelete(){
    return 'Error al eliminar!'
  },
  errorMessageDelete(errors){
    return `Hubo un error al intentar eliminar el registro. ${errors}`
  }
}