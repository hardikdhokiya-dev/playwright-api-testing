import { APIResponse, expect } from "@playwright/test";
import { BookingRequest } from "../interfaces/Booking";
import { BookingResponse } from "../interfaces/BookingResponse";

import { ResponseAssertions } from "./ResponseAssertions";

export class BookingAssertions {

    /**
     * Verifies a booking was successfully created.
     * Used by: POST /booking
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


    /**
     * Verifies booking details.
     * Used by: GET /booking/{id}
     */

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


    /**
     * Verifies the booking id list.
     * Used by: GET /booking
     */

    static async expectBookingIdList(response: APIResponse): Promise<void> {

        const body = await response.json() as { bookingid: number }[];

        expect(Array.isArray(body)).toBeTruthy();

        expect(body.length).toBeGreaterThan(0);

        body.forEach((booking) => {

            expect(booking.bookingid).toBeGreaterThan(0);

        });

    }



    /**
     * Verifies a booking exists in search results.
     * Used by: GET /booking?firstname=&lastname=
    */
    

    static async expectBookingSearchResult( response: APIResponse, bookingId: number): Promise<void> {

        const body = await response.json() as { bookingid: number }[];

        expect(Array.isArray(body)).toBeTruthy();

        expect(body.length).toBeGreaterThan(0);

        const bookingExists = body.some(

            booking => booking.bookingid === bookingId

        );

        expect(bookingExists).toBeTruthy();

    }


    /**
     * Verifies patched booking fields match expected values.
     * Used by: PATCH /booking/{id}
     */

    static async expectBookingPatched(response: APIResponse, expected: Partial<BookingRequest> ): Promise<void> {

        const body = await response.json() as BookingRequest;

        if (expected.firstname !== undefined){
            expect(body.firstname).toBe(expected.firstname);
        }

        if (expected.lastname !== undefined){
            expect(body.lastname).toBe(expected.lastname);
        }

        if (expected.totalprice !== undefined){
            expect(body.totalprice).toBe(expected.totalprice);
        }

        if (expected.depositpaid !== undefined){
            expect(body.depositpaid).toBe(expected.depositpaid);
        }

        if (expected.additionalneeds !== undefined){
            expect(body.additionalneeds).toBe(expected.additionalneeds);
        }


        if (expected.bookingdates !== undefined){

            if (expected.bookingdates.checkin !== undefined) {
                expect(body.bookingdates.checkin).toBe(expected.bookingdates.checkin);
            }

            if (expected.bookingdates.checkout !== undefined) {
                expect(body.bookingdates.checkout).toBe(expected.bookingdates.checkout);
            }


        }

    }





}