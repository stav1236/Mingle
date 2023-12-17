import jwt, { Secret } from "jsonwebtoken";

const authenticate = async (req: any, res: any, next: any) => {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    (err: any, user: any) => {
      if (err) return res.status(403).send(err.message);
      req.user = user;
      next();
    }
  );
};

export default authenticate;
