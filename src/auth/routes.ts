import { Router, RequestHandler, Request, Response } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import { userAuthDetails, SignInBody } from "../types/auth.type";
import { createUser } from "./utils";
import HttpResponse from "../utils/HTTPResponse";
import HttpException from "../utils/HTTPException";
const authRouter = Router();


authRouter.post(
  "/",
  verifyUser,
  async (req: Request, res: Response) => {
    const { uid, email, profilePic } = req.userInfo
    const { name }: SignInBody = req.body;
Request
    try {
      await createUser({ uid, email, name, profilePic });
      return HttpResponse.creaeted(res, "user is created");
    } catch (error) {
      return new HttpException(500, "internal server error");
    }
  }
);
export default  authRouter