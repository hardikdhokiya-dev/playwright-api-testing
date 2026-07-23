import { test, APIResponse } from "@playwright/test";
import { AuthAssertions } from "../assertions/AuthAssertion";
import { AuthClient } from "../clients/AuthClient";
import { AuthDataFactory } from "../factories/AuthDataFactory";
import { JsonReader } from "../utils/JsonReader";
import { AuthRequest } from "../interfaces/AuthRequest";
import { ResponseAssertions } from "../assertions/ResponseAssertions";
import { AuthTestData } from "../interfaces/AuthTestData";


/**
 * Read the data from auth.json file
 */
const authData  = JsonReader.read <AuthTestData>("testdata/auth/auth.json");


test.describe("POST /auth", () => {

    let authClient: AuthClient;

    test.beforeEach(async ({ request }) => {

        authClient = new AuthClient(request);

    });


    /**
     * TC_AUTH_01
     * Verify token generation with valid credentials.
     */

    test("should generate token with valid credentials", {tag: ["@api","@auth","@positive","@regression"]}, async () => {

        let response : APIResponse;

        await test.step("Create authentication request", async () => {

            const credentials = AuthDataFactory.create(authData.validCredentials as AuthRequest);

            response = await authClient.createToken(credentials);

        });


        await test.step("Validate token response", async () => {


            ResponseAssertions.expectSuccess(response);
            ResponseAssertions.expectStatus(response, 200);

            await AuthAssertions.expectedTockenCreated(response);

        });

    });


    /**
     * TC_AUTH_02
     * Verify invalid username is rejected.
     */

    test("should reject invalid username", {tag: ["@api","@auth","@negative"]}, async () => {

        let response : APIResponse;

        await test.step("Create authentication request", async () => {

            const invalidCredentials = AuthDataFactory.create(authData.invalidUser as AuthRequest);

            response = await authClient.createToken(invalidCredentials);

        });


        await test.step("Validate Bad Credentials response", async () => {


            ResponseAssertions.expectSuccess(response);
            ResponseAssertions.expectStatus(response, 200);

            await AuthAssertions.expectedAuthnticationFailed(response);

        });

    });


    /**
     * TC_AUTH_03
     * Verify invalid password is rejected.
     */

    test("should reject invalid password", {tag: ["@api","@auth","@negative"]}, async () => {

        let response : APIResponse;

        await test.step("Create authentication request", async () => {

            const invalidCredentials = AuthDataFactory.create(authData.invalidPassword as AuthRequest);

            response = await authClient.createToken(invalidCredentials);

        });


        await test.step("Validate Bad Credentials response", async () => {


            ResponseAssertions.expectSuccess(response);
            ResponseAssertions.expectStatus(response, 200);

            await AuthAssertions.expectedAuthnticationFailed(response);

        });

    });



});