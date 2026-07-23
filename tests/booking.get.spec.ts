import { test, expect, APIResponse } from "@playwright/test";
import { BookingClient } from "../clients/BookingClient";
import { BookingHelper } from "../utils/BookingHelper";
import { CreateBooking } from "../interfaces/CreateBooking";
import { request } from "node:http";
import { BookingAssertions } from "../assertions/BookingAssertions";
import { ResponseAssertions } from "../assertions/ResponseAssertions";
import { BookingSearch } from "../interfaces/BookingSearch";

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

                BookingAssertions.expectBookingMatches(response, createdBooking.booking)

                ResponseAssertions.expectStatus(response, 200);

                ResponseAssertions.expectSuccess(response)

            });
        
    });


    /**
     * Test Case: TC_02
     * Verify all booking ids can be retrieved.
     */
    test( "should retrieve all booking ids", { tag: ["@api", "@booking", "@get", "@regression"] }, async () => {

            let response: APIResponse;

            await test.step("Retrieve all booking ids", async () => {

                response = await bookingClient.getBookingIds();

            });

            await test.step("Validate response", async () => {

                ResponseAssertions.expectSuccess(response);

                await BookingAssertions.expectBookingIdList(response);

            });

        }
    );


    /**
     * Test Case: TC_03
     * Verify bookings can be searched using multiple filters.
     */

    test( "should search booking using multiple filters", { tag: ["@api", "@booking", "@get", "@regression"] }, async ({ request }) => {

        let createdBooking: CreateBooking;
        let response: APIResponse;

        await test.step("Create booking", async () => {

            createdBooking = await BookingHelper.createBooking(request);

        });


        await test.step("Search booking", async () => {

            response = await bookingClient.searchBookings({firstname : createdBooking.booking.firstname, lastname : createdBooking.booking.lastname});

        });
    

        await test.step("Validate response", async () => {

            ResponseAssertions.expectSuccess(response);
            await BookingAssertions.expectBookingSearchResult(response, createdBooking.bookingId);

        });



    });



    /**
     * Test Case: TC_04
     * Verify retrieving a non-existing booking returns HTTP 404.
     */
    test("should return 404 for a non-existing booking", {tag: ["@api", "@booking", "@get", "@negative"]}, async () => {

        let response: APIResponse;

        await test.step("Retrieve a non-existing booking", async () => {

                response = await bookingClient.getBooking(999999999);

        });

        await test.step("Validate response", async () => {

            ResponseAssertions.expectStatus(response, 404);

        });

    });


});