import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { BookingRequest } from "../interfaces/Booking";



export class BookingClient {

	constructor ( private readonly request : APIRequestContext) {

	}


	/**
     * Creates a new booking.
     *
     * @param booking Booking request payload.
     * @returns APIResponse
     */

	async createBooking ( booking : BookingRequest ) : Promise <APIResponse> {

		const response = await this.request.post("/booking", {data : booking});

		return response;
	}



}