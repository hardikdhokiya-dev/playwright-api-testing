import { test , expect } from "@playwright/test";
import { BookingClient } from "../clients/BookingClient";
import { BookingFactory } from "../factories/BookingFactory";


test.describe ("Booking API - POST", () => {

    let bookingClient: BookingClient;

	//beforeEach Hooks
    test.beforeEach(async ({ request }) => {
        bookingClient = new BookingClient(request);
    });

    // Test Case 1 - Happy Path 
    test("Should create a booking successfully with valid request data", { tag: ["@api", "@smoke", "@booking"] }, async () => {

        const booking = BookingFactory.createBooking();

        const response = await bookingClient.createBooking(booking);

		// Assert
		expect(response.status()).toBe(200);
		expect(response.ok()).toBeTruthy();

		expect(response.headers()["content-type"]).toContain("application/json");

		const body = await response.json();

		expect(body.bookingid).toBeGreaterThan(0);

		expect(body.booking.firstname)
			.toBe(booking.firstname);

		expect(body.booking.lastname)
			.toBe(booking.lastname);

		expect(body.booking.totalprice)
			.toBe(booking.totalprice);

		expect(body.booking.depositpaid)
			.toBe(booking.depositpaid);

		expect(body.booking.additionalneeds)
			.toBe(booking.additionalneeds);

		expect(body.booking.bookingdates.checkin)
			.toBe(booking.bookingdates.checkin);

		expect(body.booking.bookingdates.checkout)
			.toBe(booking.bookingdates.checkout);

        });



    //Test Case 2 - Verify override functionality
    test("Should create a booking with customized request data", { tag: ["@api", "@regression"] }, async () => {

            const booking = BookingFactory.createBooking({
                firstname: "John",
                lastname: "Smith",
                totalprice: 999
            });

            const response = await bookingClient.createBooking(booking);

            expect(response.status()).toBe(200);

            const body = await response.json();

            expect(body.booking.firstname).toBe("John");
            expect(body.booking.lastname).toBe("Smith");
            expect(body.booking.totalprice).toBe(999);

        });


});