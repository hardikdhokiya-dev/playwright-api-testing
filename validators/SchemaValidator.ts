import Ajv, { ValidateFunction } from "ajv";
import addFormats from "ajv-formats";
import fs from "fs";
import path from "path";

import { expect } from "@playwright/test";


export class SchemaValidator {


    /**
     * AJV instance
     * Created once and reused
     */
    private static readonly ajv = (() => {

        const ajv = new Ajv({ allErrors: true, strict: false });

        /**
         * Enables validation for formats:
         * - date
         * - date-time
         * - email
         * - uuid
         * - uri
         */
        addFormats(ajv);

        return ajv;

    })();



    /**
     * Stores compiled schemas in memory.
     *
     * Example:
     *
     * booking.schema.json
     *        |
     *        ↓
     * compiled AJV validator function
     */
    private static readonly schemaCache:
        Map<string, ValidateFunction> = new Map();



    /**
     * Validate API response against JSON schema.
     *
     * Example: SchemaValidator.validate("booking.schema.json", responseBody);
     */
    static validate( schemaFile: string, responseBody: unknown ): void {


        const validator = this.getValidator(schemaFile);

        const isValid = validator(responseBody);



        expect(isValid, 
            
            `Schema Validation Failed

            Schema:
            ${schemaFile}

            Errors:
            ${JSON.stringify(
                validator.errors,
                null,
                2
            )}
            `

        ).toBeTruthy();


    }



    /**
     * Returns compiled validator.
     *
     * Flow:
     *
     * 1. Check cache
     * 2. Load schema if missing
     * 3. Compile schema
     * 4. Store compiled validator
     */
    private static getValidator( schemaFile: string ): ValidateFunction {

        /**
         * Return cached validator
         */
        const cachedValidator = this.schemaCache.get(schemaFile);

        if (cachedValidator) {

            return cachedValidator;

        }

        /**
         * Resolve schema location
         */
        const schemaPath =
            path.resolve(
                "schemas",
                schemaFile
            );




        if (!fs.existsSync(schemaPath)) {

            throw new Error(

                `Schema file not found:
                ${schemaPath}`

            );

        }




        /**
         * Read schema file
         */
        const schema =
            JSON.parse(

                fs.readFileSync(

                    schemaPath,

                    "utf-8"

                )

            );




        /**
         * Compile schema
         */
        const validator =
            this.ajv.compile(schema);




        /**
         * Save compiled validator
         */
        this.schemaCache.set(

            schemaFile,

            validator

        );


        return validator;

    }





    /**
     * Clears schema cache.
     *
     * Useful when schema files
     * are modified during development.
     */
    static clearCache(): void {


        this.schemaCache.clear();


    }





    /**
     * Returns current cached schemas.
     *
     * Useful for debugging.
     */
    static getCacheSize(): number {

        return this.schemaCache.size;


    }


}