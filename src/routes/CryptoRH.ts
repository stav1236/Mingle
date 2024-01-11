/**
 * @swagger
 * tags:
 *   name: Cryptocurrency
 *   description: The crypto information API
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

import axios from "axios";
import express from "express";

import logger from "../common/config/logger";
import { getRelevetDataForUser } from "../logic/CryptoBl";
import authMiddleware from "../middleware/authMiddleware";

const cryptoRouter = express.Router();
cryptoRouter.use(authMiddleware);

/**
 * @swagger
 * /api/crypto/{amount}/{currency}:
 *   get:
 *     summary: Get cryptocurrency data
 *     description: Retrieve cryptocurrency data based on the specified amount and currency.
 *     tags:
 *       - Cryptocurrency
 *     parameters:
 *       - in: path
 *         name: amount
 *         description: Number of cryptocurrencies to retrieve
 *         required: true
 *         type: integer
 *       - in: path
 *         name: currency
 *         description: Currency to convert prices to (e.g., USD, EUR)
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Cryptocurrency data retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - name: "Bitcoin"
 *                 symbol: "BTC"
 *                 rank: 1
 *                 price: "45000.00"
 *                 lastUpdated: "2024-01-11 15:30:00"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
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
    res.status(200).json(getRelevetDataForUser(response.data.data, convert));
  } catch (error: any) {
    logger.error("Error fetching data: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/**
 * @swagger
 * /api/crypto/mingle:
 *   get:
 *     summary: Get data for Mingle cryptocurrency
 *     description: Retrieve data for a fictional cryptocurrency called Mingle.
 *     tags:
 *       - Cryptocurrency
 *     responses:
 *       '200':
 *         description: Mingle cryptocurrency data retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               date: "2024-01-11 15:30:00"
 *               price: "1.753429"
 *               name: "Mingle"
 *               symbol: "MNG"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
cryptoRouter.get("/mingle", async (req, res) => {
  try {
    const name = "Mingle";
    const symbol = "MNG";
    const currDate = new Date();
    const date = currDate.toLocaleString("he", {
      timeZone: "Asia/Jerusalem",
    });
    const price = (1.5 + Math.random() * (1.98 - 1.5)).toFixed(6);
    res.status(200).json({ date, price, name, symbol });
  } catch (error: any) {
    logger.error("Error fetching data: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default cryptoRouter;
