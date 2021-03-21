import Api from './Api'

const BASE_URL = "http://localhost:8080/";
let API_KEY = ""

class NetworkService {
    token="";
    newToken(token:any){
        API_KEY="?Token="+token;
    }
    SaveUser(body:any){
        var url = BASE_URL+"saveUser";
        return Api.PostFunction(url,body);
    }
    GetUserScore(userId:any){
        var url = BASE_URL+"calculateAndSaveScore/"+userId;
        return Api.GetFunction(url);
    }
    GetCities(){
        var url = BASE_URL+"getAllCities/";
        return Api.GetFunction(url);
    }
    GetIncomeRanges(){
        var url = BASE_URL+"getAllRanges/";
        return Api.GetFunction(url);
    }
}

export default new NetworkService()