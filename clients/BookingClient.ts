import { APIRequestContext, APIResponse } from "@playwright/test";
import { BookingRequest } from "../interfaces/Booking";
import { BaseApiClient } from "./BaseApiClient";



export class BookingClient extends BaseApiClient {

	constructor (request : APIRequestContext) {

		super(request);

	}


	/**
     * Creates a new booking.
     * POST /booking
     * @returns APIResponse
     */

	async createBooking ( booking : BookingRequest ) : Promise <APIResponse> {

		const response = await this.post("/booking", booking );

		return response;
	}


	/**
     * GET /booking
     * Returns all booking IDs.
     */

	async getBookingIds () : Promise <APIResponse> {

		return await this.get("/booking");
	}

	/**
     * GET /booking/{id}
     */
    async getBooking( bookingId: number): Promise<APIResponse> {

        return await this.get(`/booking/${bookingId}`);

    }



}