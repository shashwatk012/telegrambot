let { createClient } = require("pexels");
let Jimp = require("jimp");
let axios = require("axios");
let cheerio = require("cheerio");
let pretty = require("pretty");
const { hello } = require("./iphoneprices");

async function generateImage(imagePath, Type) {
  let fact = await randomFact(Type);
  let photo = await getRandomImage(Type);
  await editImage(photo, imagePath, fact.fact);
}

async function randomFact(Type) {
  let fact = hello(Type);
  // let fact;
  // await axios
  //   .get(
  //     `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
  //   )
  //   .then((response) => {
  //     // console.log(response.data);
  //     rate = response.data.ethereum;
  //     fact = {
  //       fact: `Hello, today the ethereum price is ${rate.usd}USD`,
  //     };
  //     return fact;
  //     // bot.telegram.sendMessage(ctx.chat.id, message, {});
  //     // fact = facts[randomInteger(0, facts.length - 1)];
  //   });
  return fact;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getRandomImage(animal) {
  try {
    const client = createClient(process.env.PEXELS_API_KEY);
    const query = animal;
    let image;

    await client.photos.search({ query, per_page: 10 }).then((res) => {
      let images = res.photos;
      image = images[randomInteger(0, images.length - 1)];
    });

    return image;
  } catch (error) {
    console.log("error downloading image", error);
    getRandomImage(animal);
  }
}

async function editImage(image, imagePath, fact) {
  try {
    let imgURL = image.src.medium;
    let animalImage = await Jimp.read(imgURL).catch((error) =>
      console.log("error ", error)
    );
    let animalImageWidth = animalImage.bitmap.width;
    let animalImageHeight = animalImage.bitmap.height;
    let imgDarkener = await new Jimp(
      animalImageWidth,
      animalImageHeight,
      "#000000"
    );
    imgDarkener = await imgDarkener.opacity(0.5);
    animalImage = await animalImage.composite(imgDarkener, 0, 0);

    let posX = animalImageWidth / 15;
    let posY = animalImageHeight / 15;
    let maxWidth = animalImageWidth - posX * 2;
    let maxHeight = animalImageHeight - posY;

    let font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
    await animalImage.print(
      font,
      posX,
      posY,
      {
        text: fact,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      },
      maxWidth,
      maxHeight
    );

    await animalImage.writeAsync(imagePath);
    console.log("Image generated successfully");
  } catch (error) {
    console.log("error editing image", error);
  }
}

const deleteImage = (imagePath) => {
  fs.unlink(imagePath, (err) => {
    if (err) {
      return;
    }
    console.log("file deleted");
  });
};

module.exports = { generateImage, deleteImage };
