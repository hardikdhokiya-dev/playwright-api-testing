import { DateTime } from 'luxon';




export class DateUtils {

	/**
     * Returns today's date in YYYY-MM-DD format based on local system time.
     */

	static today () : string {
        return DateTime.now().toISODate();
	}


    /**
     * Returns a future date.
     */
    static afterDays (days : number) : string {
        return DateTime.now().plus({days}).toISODate();
    } 

}