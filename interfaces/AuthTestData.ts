import { AuthRequest } from "./AuthRequest";

export interface AuthTestData {

    validCredentials: AuthRequest;

    invalidUser: AuthRequest;

    invalidPassword: AuthRequest;


}