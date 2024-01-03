export const getRelevetDataForUser = (cryptoData: any[], currency: string) => {
  return cryptoData.map((curr) => {
    const utcDate = new Date(curr?.quote[currency].last_updated);
    const price = curr?.quote[currency].price;
    return {
      name: curr?.name,
      symbol: curr?.symbol,
      rank: curr?.cmc_rank,
      price: price > 1 ? price.toFixed(2) : price.toFixed(6),
      lastUpdated: utcDate.toLocaleString("en-US", {
        timeZone: "Asia/Jerusalem",
      }),
    };
  });
};
