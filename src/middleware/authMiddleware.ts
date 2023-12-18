import jwt, { Secret } from "jsonwebtoken";

const authMiddleware = async (req: any, res: any, next: any) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    (err: any, user: any) => {
      if (err) return res.status(403).sende(err.message);
      req.user = user;
      next();
    }
  );
};

export default authMiddleware;
