import { APIRequestContext , APIResponse } from "@playwright/test";
import { BaseApiClient } from "./BaseApiClient";
import { AuthRequest } from "../interfaces/AuthRequest";

export class AuthClient extends BaseApiClient {

    constructor (request : APIRequestContext){
        super(request);
    }

    /**
     * Creates an authentication token.
     */

    async createToken ( authRequestData : AuthRequest) : Promise <APIResponse> {
    
        return await this.post("/auth", authRequestData);

    }




}