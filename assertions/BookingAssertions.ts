import { APIResponse, expect } from "@playwright/test";
import { BookingRequest } from "../interfaces/Booking";
import { BookingResponse } from "../interfaces/BookingResponse";

import { ResponseAssertions } from "./ResponseAssertions";

export class BookingAssertions {

    /**
     * Verifies a booking was successfully created.
     */
    static async expectBookingCreated(response: APIResponse, request: BookingRequest): Promise<BookingResponse> {

        await ResponseAssertions.expectSuccess(response);
        await ResponseAssertions.expectStatus(response, 200);
        await ResponseAssertions.expectContentType(response);

        const body = await response.json() as BookingResponse;

        expect(body.bookingid).toBeGreaterThan(0);

        expect(body.booking.firstname).toBe(request.firstname);

        expect(body.booking.lastname).toBe(request.lastname);

        expect(body.booking.totalprice).toBe(request.totalprice);

        expect(body.booking.depositpaid).toBe(request.depositpaid);

        expect(body.booking.bookingdates.checkin).toBe(request.bookingdates.checkin);

        expect(body.booking.bookingdates.checkout).toBe(request.bookingdates.checkout);

        expect(body.booking.additionalneeds).toBe(request.additionalneeds);

        return body;

    }



    static async expectBookingMatches( response: APIResponse, expected: BookingRequest): Promise<void> {

    const body = await response.json() as BookingRequest;

    expect(body.firstname).toBe(expected.firstname);

    expect(body.lastname).toBe(expected.lastname);

    expect(body.totalprice).toBe(expected.totalprice);

    expect(body.depositpaid).toBe(expected.depositpaid);

    expect(body.bookingdates.checkin).toBe(expected.bookingdates.checkin);

    expect(body.bookingdates.checkout).toBe(expected.bookingdates.checkout);

    expect(body.additionalneeds).toBe(expected.additionalneeds);

}

}