import jwt, { Secret } from "jsonwebtoken";
import User from "../../data/models/User";

const authMiddleware = async (req: any, res: any, next: any) => {
  const refreshToken = req.headers["refresh-token"];
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  try {
    jwt.verify(accessToken, "yourAccessTokenSecret");
    next();
  } catch (accessTokenError) {
    try {
      const decodedRefreshToken = jwt.verify(
        refreshToken,
        "yourRefreshTokenSecret"
      ) as {
        _id?: string;
      };
      const _id = decodedRefreshToken?._id;

      const user = await User.findById(_id);
      if (!user) return res.status(403).send("invalid request");
      if (!user.tokens?.includes(refreshToken)) {
        user.tokens = [];
        await user.save();
        return res.status(403).send("invalid request");
      }

      const newAccessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
      );
      const newRefreshToken = jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET as Secret
      );

      user.tokens[user.tokens.indexOf(refreshToken)] = newRefreshToken;
      await user.save();

      res.setHeader("Authorization", `Bearer ${newAccessToken}`);
      res.setHeader("Refresh-Token", newRefreshToken);

      next();
    } catch (refreshTokenError) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
};

export default authMiddleware;
