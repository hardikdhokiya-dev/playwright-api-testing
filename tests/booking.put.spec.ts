import { APIResponse, test , expect} from "@playwright/test"
import { BookingClient } from "../clients/BookingClient";
import { BookingRequest } from "../interfaces/Booking";
import { BookingDataFactory } from "../factories/BookingDataFactory";
import { BookingAssertions } from "../assertions/BookingAssertions";
import { ResponseAssertions } from "../assertions/ResponseAssertions";
import { AuthHelper } from "../utils/AuthHelper";
import { CreateBooking } from "../interfaces/CreateBooking";
import { AuthRequest } from "../interfaces/AuthRequest";
import { AuthTestData } from "../interfaces/AuthTestData";
import { JsonReader } from "../utils/JsonReader";
import { BookingHelper } from "../utils/BookingHelper";


/**
 * Read the data from auth.json file
 */
const authData  = JsonReader.read <AuthTestData>("testdata/auth/auth.json");


test.describe("PUT /booking/{id}", () => {

    let bookingClient: BookingClient;

    test.beforeEach(async ({ request }) => {

        bookingClient = new BookingClient(request);

    });



    /**
     * Test Case: TC_01
     * Verify an existing booking can be updated successfully.
     */

    test("should update an existing booking", { tag: ["@api","@booking","@put","@regression"]}, async ({ request }) => {


        let createdBooking : CreateBooking;
        let updatedBookingPayload : BookingRequest;
        let token : string;
        let response : APIResponse;

        await test.step("Generate authentication token",async () => {

            token = await AuthHelper.generateToken(request, authData.validCredentials);

        });


        await test.step("Create booking",async () => {

            createdBooking = await BookingHelper.createBooking(request);

        });


        await test.step("Generate updated booking",async () => {

            updatedBookingPayload = BookingDataFactory.createBookingData();

        });


        await test.step("Update booking",async () => {

            response = await bookingClient.updateBooking(createdBooking.bookingId,updatedBookingPayload, token); 

        });


        await test.step("Validate PUT response",async () => {

            ResponseAssertions.expectSuccess(response);
            ResponseAssertions.expectStatus(response, 200);

            await BookingAssertions.expectBookingMatches(response, updatedBookingPayload);

        });

    });


    /**
     * Test Case: TC_02
     * Verify updated booking data is persisted after a successful PUT request.
     */

    test("should persist updated booking", { tag: ["@api","@booking","@put","@regression"]}, async ({ request }) => {

        let createdBooking : CreateBooking;
        let updatedBookingPayload : BookingRequest;
        let token : string;
        let response : APIResponse;

        await test.step("Generate authentication token",async () => {

            token = await AuthHelper.generateToken(request, authData.validCredentials);

        });


        await test.step("Create booking",async () => {

            createdBooking = await BookingHelper.createBooking(request);

        });


        await test.step("Generate updated booking",async () => {

            updatedBookingPayload = BookingDataFactory.createBookingData();

        });


        await test.step("Update booking",async () => {

            response = await bookingClient.updateBooking(createdBooking.bookingId,updatedBookingPayload, token); 
            ResponseAssertions.expectSuccess(response);

        });

        await test.step("Retrieve updated booking",async () => {

            response = await bookingClient.getBooking(createdBooking.bookingId);
            
        });


        await test.step("Validate persisted booking",async () => {

            ResponseAssertions.expectSuccess(response);
            await BookingAssertions.expectBookingMatches(response, updatedBookingPayload);
            
        });

    });


    /**
     * Test Case: TC_03
     * Verify updating a non-existing booking returns an error.
     */

    test("should not update a non-existing booking", { tag: ["@api","@booking","@put","@negative","@regression"]}, async ({ request }) => {

        let createdBooking : CreateBooking;
        let updatedBookingPayload : BookingRequest;
        let token : string;
        let response : APIResponse;

        await test.step("Generate authentication token",async () => {

            token = await AuthHelper.generateToken(request, authData.validCredentials);

        });


        await test.step("Generate updated booking",async () => {

            updatedBookingPayload = BookingDataFactory.createBookingData();

        });

        await test.step("Update non-existing booking", async () => {

            response = await bookingClient.updateBooking(999999, updatedBookingPayload, token);

        });


        await test.step("Validate response", async () => {

            expect(response.ok()).toBeFalsy();

            expect([404, 405]).toContain(response.status());

        });

    });


});