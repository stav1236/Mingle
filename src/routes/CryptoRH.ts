import axios from "axios";
import express from "express";

import logger from "../common/config/logger";
import { getRelevetDataForUser } from "../logic/CryptoBl";
import authMiddleware from "../middleware/authMiddleware";

const cryptoRouter = express.Router();
cryptoRouter.use(authMiddleware);

cryptoRouter.get("/:amount/:curreny", async (req, res) => {
  try {
    const limit = req.params.amount;
    const convert = req.params.curreny;

    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: {
          start: 1,
          limit,
          convert,
        },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_API_TOKEN,
        },
      }
    );
    res.json(getRelevetDataForUser(response.data.data, convert));
  } catch (error: any) {
    logger.error("Error fetching data: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default cryptoRouter;
