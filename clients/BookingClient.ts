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



}