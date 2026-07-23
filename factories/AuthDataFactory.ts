import { AuthRequest } from "../interfaces/AuthRequest";


export class AuthDataFactory {


    static create (data : AuthRequest) : AuthRequest {

        return { 
            
            username : data.username,
            password: data.password

        };




    }




}