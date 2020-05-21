import ApiService from './defualtServices';

export default {
  getAssistants(params){
    return ApiService.getAll('assistants', params)
  },
  postSaveAssistant(assistant){
    return ApiService.post('assistants', { assistant: assistant })
  },
  putUpdateAssistant(assistant){
    return ApiService.put(`assistants/${assistant.id}`, { assistant: assistant })
  },
  deleteAssistant(assistant){
    return ApiService.delete(`assistants/${assistant.id}`)
  }
}