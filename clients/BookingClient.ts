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
	 * Updates an existing booking.
	 */
	async updateBooking(bookingId: number, booking: BookingRequest, token: string): Promise<APIResponse> {

    return await this.request.put(`/booking/${bookingId}`,
		{
            headers: this.authHeaders(token),
            data: booking
        }
    );

	}



	/**
	 * Partially updates an existing booking.
	 */
	async patchBooking(bookingId: number, booking: Partial<BookingRequest>, token: string): Promise<APIResponse> {

    return await this.request.patch(`/booking/${bookingId}`,
		{
            headers: this.authHeaders(token),
            data: booking
        }
    );

	}



	
	/**
     * DELETE /booking/{id}
     */

	async 	deleteBooking (bookingId : number, token : string) : Promise <APIResponse> {

		return await this.delete(`/booking/${bookingId}`,{ headers : this.authHeaders(token),});

	}




}