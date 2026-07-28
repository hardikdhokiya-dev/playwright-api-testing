import { APIResponse, expect } from "@playwright/test";
import { AuthResponse } from "../interfaces/AuthResponse";
import { SchemaValidator } from "../validators/SchemaValidator";


export class AuthAssertions {


    static async expectedTockenCreated ( response : APIResponse) : Promise <void> {

        const bodyJson = await response.json();

        SchemaValidator.validate( "auth.schema.json", bodyJson);

        const body = bodyJson as AuthResponse;

        expect(body.token).toBeTruthy();

    }


    static async expectedAuthnticationFailed ( response : APIResponse) : Promise <void> {

        const body = await response.json() as AuthResponse;

        expect(body.reason).toBe("Bad credentials");

        expect(body.token).toBeUndefined();

    }

}