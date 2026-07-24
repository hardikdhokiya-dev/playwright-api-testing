import { APIRequestContext, APIResponse } from "@playwright/test";

export abstract class BaseApiClient {

    protected readonly request : APIRequestContext;

    constructor (request : APIRequestContext){
        this.request = request;
    }  


    protected async post (endpoint : string , body : unknown) : Promise<APIResponse> {
        return await this.request.post(endpoint, {data : body});
    }


    protected async get (endpoint : string ) : Promise<APIResponse> {
        return await this.request.get(endpoint);
    }


    protected async put (endpoint : string , body : unknown) : Promise<APIResponse> {
        return await this.request.put(endpoint, {data : body});
    }


    protected async patch (endpoint : string , body : unknown) : Promise<APIResponse> {
        return await this.request.patch(endpoint, {data : body});
    }


    protected async delete (endpoint : string , body : unknown) : Promise<APIResponse> {
        return await this.request.delete(endpoint, {data : body});
    }


    protected authHeaders(token: string): Record<string, string> {
        return {
            Cookie: `token=${token}`
        };
    }







}