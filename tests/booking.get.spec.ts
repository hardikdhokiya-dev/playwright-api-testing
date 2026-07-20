import { test, expect } from "@playwright/test";
import { BookingClient } from "../clients/BookingClient";
import { BookingHelper } from "../utils/BookingHelper";
import { CreateBooking } from "../interfaces/CreateBooking";

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

    test("should retrieve booking by valid booking id", { tag: ["@api", "@booking", "@get", "@regression"] }, async () => {











    });


});