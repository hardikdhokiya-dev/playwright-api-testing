import { APIResponse, expect } from "@playwright/test";
import { AuthResponse } from "../interfaces/AuthResponse";


export class AuthAssertions {


    static async expectedTockenCreated ( response : APIResponse) : Promise <void> {

        const body = await response.json() as AuthResponse;

        expect(body.token).toBeTruthy();

    }


    static async expectedAuthnticationFailed ( response : APIResponse) : Promise <void> {

        const body = await response.json() as AuthResponse;

        expect(body.reason).toBe("Bad credentials");

        expect(body.token).toBeUndefined();

    }

}