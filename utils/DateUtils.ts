export class DateUtils {

	/**
     * Returns today's date in YYYY-MM-DD format based on local system time.
     */

	static today () : string {

		const date = new Date();
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}


	/**
     * Returns a local date offset by a specific number of days (positive or negative).
     */
    static daysFromToday(days: number): string {
        const date = new Date();
        date.setDate(date.getDate() + days);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        
        return `${year}-${month}-${day}`;
    }

    /**
     * Generates a fully compliant ISO timestamp for database and payload assertions.
     */
    static currentTimestamp(): string {
        return new Date().toISOString();
    }


}