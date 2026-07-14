import fs from 'fs';
import path from 'path';


export class JsonReader {


    /**
     * Reads a JSON file and converts it into the specified type.
     *
     * @param filePath Relative path from project root
     * @returns Parsed JSON object
     */


    static read <T> (filePath : string) {

        const absolutePath = path.resolve(filePath);    //because different operating systems and CI runners resolve relative paths differently.
        const fileContent = fs.readFileSync(absolutePath, 'utf-8');
        return JSON.parse(fileContent) as T;

    }

}