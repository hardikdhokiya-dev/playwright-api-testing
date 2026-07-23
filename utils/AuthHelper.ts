import { APIRequestContext } from "@playwright/test";
import { AuthClient } from "../clients/AuthClient";
import { AuthDataFactory } from "../factories/AuthDataFactory";
import { AuthResponse } from "../interfaces/AuthResponse";
import { AuthRequest } from "../interfaces/AuthRequest";


export class AuthHelper {


    static async generateToken (request : APIRequestContext, credentials : AuthRequest) : Promise<string> {

        const client = new AuthClient(request);

        const response = await client.createToken(credentials);

        const body = await response.json() as AuthResponse;

        if(!body.token) {
            throw new Error (`Authentication failed: ${body.reason}`)
        }

        return body.token;

    }




















}