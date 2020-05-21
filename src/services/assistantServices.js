import ApiService from './defualtServices';

export default {
  getAssistants(params){
    return ApiService.getAll('assistants', params)
  }
}