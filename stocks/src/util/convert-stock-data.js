export const converStockData = (data) => {
  const stockInfo = {
    volume: [],
    candle: []
  };
  const arrLength = data.t.length;
  for (let i = 0; i < arrLength; i++) {
    stockInfo.candle.push({
      x: new Date(data.t[i] * 1000),
      y: [data.o[i], data.h[i], data.l[i], data.c[i]],
    });
    stockInfo.volume.push({
      dates: new Date(data.t[i] * 1000),
      volume:data.v[i]
  })
  }
  return stockInfo;
};
