import { BookingRequest } from "../interfaces/Booking";
import { JsonReader } from "../utils/JsonReader";
import { faker } from "@faker-js/faker";
import { DateUtils } from "../utils/DateUtils";

export class BookingDataFactory {

	static createBookingData ( override ?: Partial<BookingRequest> ) : BookingRequest {

		return {

			firstname : faker.person.firstName(),
			lastname : faker.person.lastName(),

			depositpaid : faker.datatype.boolean(),

			totalprice : faker.number.int({min : 100 , max : 9999}),

			bookingdates : {

				checkin : DateUtils.today(),
				checkout : DateUtils.afterDays(7)
			},

			additionalneeds : faker.food.dish(),

			...override

		};


	}

  
}