import { test , expect } from "@playwright/test";
import { BookingClient } from "../clients/BookingClient";
import { BookingFactory } from "../factories/BookingFactory";


test.describe ("Booking API - POST", () => {

    let bookingClient: BookingClient;


    test.beforeEach(async ({ request }) => {
        bookingClient = new BookingClient(request);
    });


});