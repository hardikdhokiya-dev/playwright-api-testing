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

}