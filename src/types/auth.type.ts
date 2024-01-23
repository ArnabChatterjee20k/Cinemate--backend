import { IncomingHttpHeaders } from "http";

export type SignInId = IncomingHttpHeaders["authorization"];
export interface SignInBody {
  name: string;
}

export interface userAuthDetails{
    uid: string;
    profilePic: string | undefined;
    email: string | undefined;
}
export interface userAuthInfo extends SignInBody{}
