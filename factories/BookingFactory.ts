import { BookingRequest } from "../interfaces/Booking";

export class BookingFactory {

	static createBooking ( override ?: Partial<BookingRequest> ) : BookingRequest {

		const defaultBooking : BookingRequest = {

			firstname : "Jofra",
			lastname : "Archer",
			totalprice : 300,
			depositpaid : true,
			
			bookingdates : {
				checkin : "2026-07-01",
				checkout : "2026-07-10"
			},

			additionalneeds: "Breakfast"

		};

		return {
			... defaultBooking,
			... override
		};


	}

  
}