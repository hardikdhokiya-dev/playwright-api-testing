import { APIResponse, test , expect} from "@playwright/test"
import { BookingClient } from "../clients/BookingClient";
import { BookingRequest } from "../interfaces/Booking";
import { BookingDataFactory } from "../factories/BookingDataFactory";
import { BookingAssertions } from "../assertions/BookingAssertions";
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


test.describe("PUT /booking/{id}", () => {

    let bookingClient: BookingClient;

    test.beforeEach(async ({ request }) => {

        bookingClient = new BookingClient(request);

    });



    /**
     * Test Case: TC_01
     * Verify a single booking field can be updated.
     */

    test("should update booking firstname", { tag: ["@api","@booking","@patch","@regression"]}, async ({ request }) => {

        let createdBooking : CreateBooking;
        let token : string;
        let response : APIResponse;

        const patchData : Partial<BookingRequest> = { firstname : "Joff"};


        await test.step("Generate authentication token",async () => {

            token = await AuthHelper.generateToken(request, authData.validCredentials);

        });
        
        
        await test.step("Create booking",async () => {
        
            createdBooking = await BookingHelper.createBooking(request);

        });

        
        await test.step("Patch booking", async () => {

            response = await bookingClient.patchBooking(createdBooking.bookingId, patchData, token);

        });



        await test.step("Validate PATCH response", async () => {

            ResponseAssertions.expectSuccess(response);
            ResponseAssertions.expectStatus(response, 200);
            BookingAssertions.expectBookingPatched(response, patchData);

        });

    });



    /**
     * Test Case: TC_02
     * Verify multiple booking fields can be updated.
     */

    test("should update multiple booking fields", { tag: ["@api","@booking","@patch","@regression"]}, async ({ request }) => {


        let createdBooking : CreateBooking;
        let token : string;
        let response : APIResponse;

        const patchData : Partial<BookingRequest> = { firstname : "Joff", lastname : "Bathel", totalprice : 9999};

        await test.step("Generate authentication token",async () => {

            token = await AuthHelper.generateToken(request, authData.validCredentials);

        });
        
        
        await test.step("Create booking",async () => {
        
            createdBooking = await BookingHelper.createBooking(request);

        });

        
        await test.step("Patch booking", async () => {

            response = await bookingClient.patchBooking(createdBooking.bookingId, patchData, token);

        });


        await test.step("Validate PATCH response", async () => {

            ResponseAssertions.expectSuccess(response);
            ResponseAssertions.expectStatus(response, 200);
            BookingAssertions.expectBookingPatched(response, patchData);

        });

    });


















});