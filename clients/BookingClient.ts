import { APIRequestContext, APIResponse } from "@playwright/test";
import { BookingRequest } from "../interfaces/Booking";
import { BaseApiClient } from "./BaseApiClient";
import { BookingSearch } from "../interfaces/BookingSearch";


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


	/**
     * GET /booking
	 * Retrieves bookings using optional filters.
     */
    async searchBookings (filters : any) : Promise<APIResponse> {

        return await this.request.get("/booking", { params : filters});

	}


	/**
     * PATCH /booking/{id}
     */

	async partialUpdateBooking (bookingId : number, token : string, payload : Partial<APIResponse>) : Promise <APIResponse> {

		return await this.patch(`/booking/${bookingId}`,{ headers : {Cookie : `token=${token}`}, data : payload});

	}

	
	/**
     * DELETE /booking/{id}
     */

	async 	deleteBooking (bookingId : number, token : string) : Promise <APIResponse> {

		return await this.delete(`/booking/${bookingId}`,{ headers : {Cookie : `token=${token}`}});

	}




}