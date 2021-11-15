const getRandomPrice = () => {
  const rnd = Math.random();
  return Math.floor(rnd * 20) * 10 + 9.95;
};

const IMAGES = [
  "6123150777",
  "6126039472",
  "6126040354",
  "6128597660",
  "6134992334",
  "6136170572",
  "6136172483",
  "6140906765",
  "6142673815",
  "6142681673",
  "6142683276",
  "6148226736",
];

const getImage = (id) => {
  return `images/${IMAGES[id % IMAGES.length]}.webp`;
};

const transformData = (rawData) => {
  return rawData.reduce((products, product, id) => {
    const { dish, description } = product;
    return {
      ...products,
      [id]: {
        id,
        name: dish,
        description,
        price: getRandomPrice(),
        isFavorite: false,
        image: getImage(id),
      },
    };
  }, {});
};

export default transformData;
