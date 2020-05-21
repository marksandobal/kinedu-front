import ApiService from './defualtServices';

export default {
  getBabies(params){
    return ApiService.getAll('babies', params)
  }
}