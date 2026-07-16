import { test , expect } from "@playwright/test";
import { BookingClient } from "../clients/BookingClient";
import { BookingDataFactory } from "../factories/BookingDataFactory";
import { BookingAssertions } from "../assertions/BookingAssertions";
import { ResponseAssertions } from "../assertions/ResponseAssertions";
import { BookingRequest } from "../interfaces/Booking";


test.describe ("Booking API - POST", () => {

    let bookingClient: BookingClient;

	//beforeEach Hooks
    test.beforeEach(async ({ request }) => {
        bookingClient = new BookingClient(request);
    });

    /**
     * Test Case: TC_1
     * Verify a booking can be created using valid data.
     */
    test("should create a booking successfully with valid request data", { tag: ["@api", "@smoke", "@booking"] }, async () => {

        // Arrange
        const booking = BookingDataFactory.createBooking ();

        // Act
        const startTime = Date.now();

        const response = await bookingClient.createBooking(booking);

		// Assert
		await BookingAssertions.expectBookingCreated(response , booking);
        await ResponseAssertions.expectResponseTime(startTime, 2000)

    });

    /**
     * Test Case: TC_2
     * Verify overridden values are persisted.
     */
    test("should create a booking with overridden values", { tag: ["@api", "@booking", "@regression"] }, async () => {

         // Arrange
        const booking = BookingDataFactory.createBooking({ firstname: "John", lastname: "Smith", totalprice: 999 });

        // Act
        const response = await bookingClient.createBooking(booking);

        // Assert
		await BookingAssertions.expectBookingCreated(response , booking);

    });


    /**
     * Test Case: TC_3
     * Verify booking creation when optional fields are omitted.
     */

    test ( "should create a booking without additional needs" , {tag : ["@api", "@booking", "@regression"]}, async () => {

        const booking = BookingDataFactory.createBooking();

        delete booking.additionalneeds;

        const response = await bookingClient.createBooking(booking);

        await BookingAssertions.expectBookingCreated(response, booking);

    });


    /**
     * Test Case: TC_4
     * Verify multiple bookings can be created and and each booking receives a unique ID.
     */
    test ( "should create multiple unique bookings", {tag : ["@api", "@booking", "@regression"]}, async () => {

        const bookingIds = new Set<number>();

        for ( let i = 0; i < 5; i++){

            const booking = BookingDataFactory.createBooking();

            const response = await bookingClient.createBooking(booking);

            const created = await BookingAssertions.expectBookingCreated(response, booking);

            expect(bookingIds.has(created.bookingid)).toBeFalsy(); //early exit from the loop if duplicate found

            bookingIds.add(created.bookingid);

        }

        //expect(bookingIds.size).toBe(5); Immediately tells us that no duplicate ID was returned.
    });


    /**
     * Test Case: TC_5
     * Verify an invalid request is rejected.
     */

    test ( "should reject an invalid booking request", {tag : ["@api", "@booking", "@regression"]}, async ({request}) => { 

        const invalidBooking = { firstname : 123, lastname : true, totalprice : "invalid"};

        const response = await request.post("/booking", { data : invalidBooking});

        expect(response.ok()).toBeFalsy();

        expect(response.status()).toBeGreaterThanOrEqual(400);

    });

});