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
            console.log(token)
        
        });
        

        await test.step("Create booking",async () => {
        
            createdBooking = await BookingHelper.createBooking(request);
            console.log(createdBooking)

        });


        await test.step("Delete booking",async () => {
        
            response = await bookingClient.deleteBooking(createdBooking.bookingId, token);

        });

        await test.step("Validate delete response",async () => {
        
            ResponseAssertions.expectCreated(response);

        });


    });
















































});
