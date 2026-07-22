import { APIRequestContext } from "@playwright/test";

import { BookingClient } from "../clients/BookingClient";

import { BookingDataFactory } from "../factories/BookingDataFactory";

import { BookingAssertions } from "../assertions/BookingAssertions";

import { BookingRequest } from "../interfaces/Booking";

import { CreateBooking } from "../interfaces/CreateBooking";

import { BookingResponse } from "../interfaces/BookingResponse";

export class BookingHelper {

    /**
     * Creates a booking and returns both the booking id and request payload.
     */
    static async createBooking(request: APIRequestContext, overrides?: Partial<BookingRequest>): Promise<CreateBooking> {

        const bookingClient = new BookingClient(request);

        const booking = BookingDataFactory.createBooking(overrides);

        const response = await bookingClient.createBooking(booking);

        const createdBooking: BookingResponse = await BookingAssertions.expectBookingCreated( response, booking );

        return {

            bookingId: createdBooking.bookingid,

            booking

        };

    }

}