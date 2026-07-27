import { APIResponse, test } from "@playwright/test"
import { BookingClient } from "../clients/BookingClient";
import { ResponseAssertions } from "../assertions/ResponseAssertions";
import { AuthHelper } from "../utils/AuthHelper";
import { CreateBooking } from "../interfaces/CreateBooking";
import { AuthTestData } from "../interfaces/AuthTestData";
import { JsonReader } from "../utils/JsonReader";
import { BookingHelper } from "../utils/BookingHelper";

/**
 * Read the data from auth.json file
 */
const authData  = JsonReader.read <AuthTestData>("testdata/auth/auth.json");


test.describe("DELETE /booking/{id}", () => {

    let bookingClient: BookingClient;
    let token: string;
    let createdBooking: CreateBooking;
    let response: APIResponse;

    test.beforeEach(async ({ request }) => {

        bookingClient = new BookingClient(request);

    });


    /**
     * Test Case: TC_01
     * Verify an existing booking can be deleted successfully.
     */

    test("should delete an existing booking", { tag: ["@api","@booking","@delete","@regression"]}, async ({ request }) => {

        await test.step("Generate authentication token",async () => {
        
            token = await AuthHelper.generateToken(request, authData.validCredentials);

        });
        
        await test.step("Create booking",async () => {
        
            createdBooking = await BookingHelper.createBooking(request);

        });

        await test.step("Delete booking",async () => {
        
            response = await bookingClient.deleteBooking(createdBooking.bookingId, token);

        });

        await test.step("Validate delete response",async () => {
        
            ResponseAssertions.expectCreated(response);

        });


    });


    /**
     * Test Case: TC_02
     * Verify a deleted booking cannot be retrieved.
     */

    test("should not retrieve a deleted booking", { tag: ["@api","@booking","@delete","@regression"]}, async ({ request }) => {

        await test.step("Generate authentication token",async () => {
        
            token = await AuthHelper.generateToken(request, authData.validCredentials);

        });
        
        await test.step("Create booking",async () => {
        
            createdBooking = await BookingHelper.createBooking(request);

        });

        await test.step("Delete booking",async () => {
        
            response = await bookingClient.deleteBooking(createdBooking.bookingId, token);

        });

        await test.step("Retrieve deleted booking",async () => {
        
            response = await bookingClient.getBooking(createdBooking.bookingId);

        });

        await test.step("Validate booking no longer exists",async () => {
        
            ResponseAssertions.expectNotFound(response);

        });

    });


    /**
     * Test Case: TC_03
     * Verify deleting a non-existing booking returns an error.
     */

    test("should not delete a non-existing booking", { tag: ["@api","@booking","@delete","@negative"]}, async ({ request }) => {

        await test.step("Generate authentication token",async () => {
        
            token = await AuthHelper.generateToken(request, authData.validCredentials);

        });

        await test.step("Delete non-existing booking",async () => {
        
            response = await bookingClient.deleteBooking(99999, token)

        });

        await test.step("Validate response",async () => {
        
            ResponseAssertions.expectMethodNotAllowed(response);

        });

    });


    /**
     * Test Case: TC_04
     * Verify deleting a booking without authentication is rejected.
     */

    test("should reject delete request without authentication", { tag: ["@api","@booking","@delete","@negative"]}, async ({ request }) => {

        await test.step("Create booking",async () => {
        
            createdBooking = await BookingHelper.createBooking(request);

        });


        await test.step("Delete booking without token",async () => {
        
            response = await bookingClient.deleteBooking(createdBooking.bookingId, "")

        });


        await test.step("Validate forbidden response",async () => {
        
            ResponseAssertions.expectForbidden(response);

        });

    });

});
