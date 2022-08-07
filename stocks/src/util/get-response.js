const apiKey = "cbjp5eqad3iarlnd6g00";
const mainUrl = "https://finnhub.io/api/v1/stock/";

export const getResponse = async (searchType, info) => {
  let url;
  if (searchType === "profile") {
    url = `${mainUrl}profile2?symbol=${info}&token=${apiKey}`;
  }
  if (searchType === "stock") {
    url = `${mainUrl}candle?symbol=${info.symbol}&resolution=${info.resolution}&from=${info.from}&to=${info.to}&token=${apiKey}`;
  }
  if (searchType === "symbol") {
    url = `${mainUrl.slice(0, 26)}search?q=${info}&token=${apiKey}`;
  }
  const response = await fetch(url);
  return response;
};