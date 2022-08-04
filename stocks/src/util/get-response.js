const apiKey = "cbjp5eqad3iarlnd6g00";
const mainUrl = "https://finnhub.io/api/v1/stock/";

export const getResponse = (searchType, info) => {
  let url;
  if (searchType === "profile") {
    url = `${mainUrl}profile2?symbol=${info}&token=${apiKey}`;
  }
  if (searchType === "stock") {
    url = `${mainUrl}candle?symbol=${info.symbol}&resolution=${info.resolution}&from=${info.from}&to=${info.to}&token=${apiKey}`;
  }
  const response = fetch(url);
  return response;
};
