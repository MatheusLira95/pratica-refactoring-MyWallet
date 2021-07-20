import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as userRepository from "../repositories/userRepository.js";

async function create(email, name, password) {
  const existingUserWithGivenEmail = await userRepository.getByEmail(email);

  if (existingUserWithGivenEmail.rows[0]) {
    return null;
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  await userRepository.create(email, name, hashedPassword);
}

async function authenticate(email, password) {
  const user = await userRepository.getByEmail(email);

  if (!user.rows[0] || !bcrypt.compareSync(password, user.rows[0].password)) {
    return null;
  } else {
    return user;
  }
}

async function getToken(user) {
  const token = jwt.sign(
    {
      id: user.rows[0].id,
    },
    process.env.JWT_SECRET
  );
  return token;
}

export { create, authenticate, getToken };
