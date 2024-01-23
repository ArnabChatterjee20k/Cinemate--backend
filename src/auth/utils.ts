import { getDB } from "../db/db";
import { users } from "../db/schema";
import { userAuthDetails, SignInBody } from "../types/auth.type";
export async function createUser({
  uid,
  profilePic,
  email,
  name,
}: userAuthDetails & SignInBody) {
  const db = await getDB();
  await db.insert(users).values({
    name: name,
    profilePic: profilePic,
    email: email as string,
    uid: uid,
  });
}
