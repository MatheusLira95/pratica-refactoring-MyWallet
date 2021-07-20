import * as userServices from "../services/userServices.js";

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.sendStatus(400);
    }

    const existingUserWithGivenEmail = await userServices.create(
      email,
      name,
      password
    );

    if (existingUserWithGivenEmail === null) {
      return res.sendStatus(409);
    }

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await userServices.authenticate(email, password);

    if (user === null) {
      return res.sendStatus(401);
    }

    const token = userServices.getToken(user);

    res.send({
      token,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export { signUp, signIn };
