import { userAuthDetails } from "../src/types/auth.type"
import * as express from "express"
declare global {
  namespace Express {
      interface Request {
        userInfo:userAuthDetails
      }
  }
}