import ApiService from './defualtServices';

export default {
  getActivities(params){
    return ApiService.getAll('activities', params)
  }
}