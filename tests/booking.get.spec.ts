import { test, expect, APIResponse } from "@playwright/test";
import { BookingClient } from "../clients/BookingClient";
import { BookingHelper } from "../utils/BookingHelper";
import { CreateBooking } from "../interfaces/CreateBooking";
import { request } from "node:http";
import { BookingAssertions } from "../assertions/BookingAssertions";
import { ResponseAssertions } from "../assertions/ResponseAssertions";

test.describe("GET /booking", () => {

    let bookingClient: BookingClient;

	//beforeEach Hooks
    test.beforeEach(async ({ request }) => {
        bookingClient = new BookingClient(request);
    });

    /**
     * Test Case: TC_01
     * Verify an existing booking can be retrieved by booking ID.
     */

    test("should retrieve booking by valid booking id", { tag: ["@api", "@booking", "@get", "@regression"] }, async ({request}) => {

        let createdBooking: CreateBooking;
        let response : APIResponse;

        await test.step("Create a booking", async () => {
            createdBooking = await BookingHelper.createBooking(request);
        });
        

        await test.step("Retrieve booking by id", async () => {
            response = await bookingClient.getBooking(createdBooking.bookingId);
        });


        await test.step("Validate booking", async () => {

                BookingAssertions.expectBookingCreated(response, createdBooking.booking);

                ResponseAssertions.expectStatus(response, 200);

                ResponseAssertions.expectSuccess(response)

            });
        
    });


});