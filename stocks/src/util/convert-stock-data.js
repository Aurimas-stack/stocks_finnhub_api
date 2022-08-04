export const converStockData = (data) => {
  const stockInfo = [];
  const arrLength = data.t.length;
  for (let i = 0; i < arrLength; i++) {
    stockInfo.push({
      x: new Date(data.t[i] * 1000),
      y: [data.o[i], data.h[i], data.l[i], data.c[i]],
    });
  }
  return stockInfo;
};
