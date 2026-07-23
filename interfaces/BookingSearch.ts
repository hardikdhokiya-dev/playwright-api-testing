export interface BookingSearch {

    [key: string]: string | number | boolean | undefined;

    firstname : string;

    lastname : string;

    checkin? : string;

    checkout?: string;

}