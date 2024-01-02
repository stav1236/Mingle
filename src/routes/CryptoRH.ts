import express from "express";
import { getUserById, updateAvatar, updateUserDetails } from "../logic/UserBL";
import logger from "../common/config/logger";
import { numericProjection } from "../common/utilities/mongoUtils";
import { ProjectionType } from "mongoose";
import User from "../data/models/User";
import axios from "axios";

const cryptoRouter = express.Router();

cryptoRouter.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: {
          start: 1,
          limit: 10,
          convert: "ILS",
        },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_API_TOKEN,
        },
      }
    );
    res.json(response.data);
  } catch (error: any) {
    logger.error("Error fetching data: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default cryptoRouter;
