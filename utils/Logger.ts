export class Logger {

    static info(message: string): void {
        console.log(`ℹ️  ${message}`);
    }

    static success(message: string): void {
        console.log(`✅ ${message}`);
    }

    static warning(message: string): void {
        console.warn(`⚠️ ${message}`);
    }

    static error(message: string): void {
        console.error(`❌ ${message}`);
    }

    static request( method: string, endpoint: string, body?: unknown ): void {

        console.log("\n========== API REQUEST ==========");
        console.log(`Method   : ${method}`);
        console.log(`Endpoint : ${endpoint}`);

        if (body) {
            console.log("Payload:");
            console.log(JSON.stringify(body, null, 4));
        }

        console.log("=================================\n");

    }

    static response( status: number, body: string, elapsedMs?: number ): void {

        console.log("\n========== RESPONSE ==========");
        console.log(`Status : ${status}`);

        if (elapsedMs !== undefined) {
            console.log(`Time   : ${elapsedMs} ms`);
        }

        console.log(body);
        console.log("==============================\n");
    }

}