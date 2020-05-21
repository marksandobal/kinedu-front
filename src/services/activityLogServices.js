import ApiService from './defualtServices';

export default {
  getActivityLogs(params){
    return ApiService.getAll('activity_logs', params)
  }
}