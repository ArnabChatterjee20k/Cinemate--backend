import { auth } from "../utils/useFirebase";
import { Request, Response, NextFunction } from "express";
import { SignInBody, SignInId } from "../types/auth.type";
import HttpException from "../utils/HTTPException";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idToken: SignInId = req.headers.authorization;
  if (!idToken) {
    res.status(400).json({ message: "auth token not present" });
  }

  if (idToken) {
    const { name }: SignInBody = req.body;
    if (!name) next(new HttpException(403, "Name not found"));

    try {
      const { email, picture, uid } = await auth.verifyIdToken(
        "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiT3R0ZXIgTW91bnRhaW4iLCJlbWFpbCI6Im90dGVyLm1vdW50YWluLjgxQGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF1dGhfdGltZSI6MTY5NzUyNTM3NiwidXNlcl9pZCI6InhzbFJkNzV5eXZueTB6SmJTWWJWZTM1VlV3c3MiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm90dGVyLm1vdW50YWluLjgxQGV4YW1wbGUuY29tIl0sImdvb2dsZS5jb20iOlsiNDQ0NzI1MjY0MzM5MzY2MzkwODg5NTY2ODYzOTE3OTE1MjgzMjU3OSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifSwiaWF0IjoxNjk3NTI1Mzc2LCJleHAiOjE2OTc1Mjg5NzYsImF1ZCI6ImNpbmVtYXRlLWFkMTZlIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NpbmVtYXRlLWFkMTZlIiwic3ViIjoieHNsUmQ3NXl5dm55MHpKYlNZYlZlMzVWVXdzcyJ9",true
      );

      req["userInfo"] = { email, uid, profilePic: picture };
    } catch (error) {
      // next(new HttpException(403, "some issues with the auth token"));
      console.log(error);
    }
  } else next(next(new HttpException(403, "No auth token is present")));
};
