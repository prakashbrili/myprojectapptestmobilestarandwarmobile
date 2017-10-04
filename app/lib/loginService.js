
import dataSource from '../utils/dataSource';


class LoginService{
    static getLoginInfo(userCredentials, responseHandler){
        let userDetails = dataSource.people[0].results;
        for(let i=0 ; i < userDetails.length ; i++ ){
            if(userDetails[i].name === userCredentials.user && userDetails[i].birth_year === userCredentials.password){
                let validUser = userDetails[i];
                return responseHandler( validUser ,'success');
            }
        }
        return responseHandler( null, 'error');
    }
}

export default LoginService;