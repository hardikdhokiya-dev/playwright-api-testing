import { APIResponse, expect } from "@playwright/test";

export class ResponseAssertions {

    /**
     * Verifies the HTTP status code.
     */
    static async expectStatus(response: APIResponse, expectedStatus: number): Promise<void> {

        expect(response.status()).toBe(expectedStatus);

    }

    /**
     * Verifies the response was successful.
     */
    static async expectSuccess(response: APIResponse): Promise<void> {

        expect(response.ok()).toBeTruthy();

    }

    /**
     * Verifies the response content type.
     */
    static async expectContentType(response: APIResponse, expected = "application/json"): Promise<void> {

        const contentType = response.headers()["content-type"];

        expect(contentType).toContain(expected);

    }

    /**
     * Verifies response time.
     */
    static async expectResponseTime(startTime: number, maxMilliseconds: number): Promise<void> {

        const responseTime = Date.now() - startTime;

        expect(responseTime).toBeLessThan(maxMilliseconds);

    }

    /**
     * Verifies response status is 201 Created.
     */


    static expectCreated(response: APIResponse): void {

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);
        console.log("Body:", response.text());

    }


    /**
     * Verifies response status is 403 Forbidden.
     */
    static expectForbidden(response: APIResponse): void {

        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(403);

    }

    /**
     * Verifies response status is 404 Not Found.
     */
    static expectNotFound(response: APIResponse): void {

        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(404);

    }


















}