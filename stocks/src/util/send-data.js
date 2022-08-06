export const sendData = async (data) => {
  await fetch("/api/stock", {
    method: "POST",
    body: JSON.stringify({
      name: data.name,
      price: data.price.map(
        ({ x, y }) => `Date: ${x.toISOString().slice(0, 10)}, Price: ${y}`
      ),
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((resp) => {
      resp.json();
    })
    .catch((error) => console.log(error));
};
