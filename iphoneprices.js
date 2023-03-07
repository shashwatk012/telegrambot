let axios = require("axios");
let cheerio = require("cheerio");
let pretty = require("pretty");

const link = (Type) => {
  if (Type === "Iphone6") {
    return "https://www.flipkart.com/apple-iphone-6s-plus-gold-32-gb/p/itmen2yyeftbdt2y?pid=MOBEN2YY9PHNXRNZ&lid=LSTMOBEN2YY9PHNXRNZV3S7LI&marketplace=FLIPKART&q=iphone6&store=tyy%2F4io&srno=s_1_1&otracker=search&otracker1=search&fm=Search&iid=f362b4f3-f4a9-4361-bb39-cf65990eb449.MOBEN2YY9PHNXRNZ.SEARCH&ppt=sp&ppn=sp&ssid=arl33qqnv40000001678193790560&qH=89f7223010c05c78";
  }
  if (Type === "Iphone7") {
    return "https://www.flipkart.com/apple-iphone-7-black-32-gb/p/itmen6daftcqwzeg?pid=MOBEMK62PN2HU7EE&lid=LSTMOBEMK62PN2HU7EEINTGNU&marketplace=FLIPKART&q=iphone7&store=tyy%2F4io&srno=s_1_1&otracker=search&otracker1=search&fm=Search&iid=51625d9f-89ae-4073-a00a-20c4594e6ecc.MOBEMK62PN2HU7EE.SEARCH&ppt=sp&ppn=sp&ssid=iwyvejv2e80000001678193831749&qH=c848b7081ba96a14";
  }
  if (Type === "Iphone8") {
    return "https://www.flipkart.com/apple-iphone-8-gold-64-gb/p/itmexrgvcbsga3zz?pid=MOBEXRGVZWHDW2RQ&lid=LSTMOBEXRGVZWHDW2RQXUQHVK&marketplace=FLIPKART&q=iphone8&store=tyy%2F4io&srno=s_1_4&otracker=search&otracker1=search&fm=Search&iid=2c1ba631-2d98-4958-90c2-809ad5e3010c.MOBEXRGVZWHDW2RQ.SEARCH&ppt=sp&ppn=sp&ssid=uhdns61z8w0000001678194509137&qH=b2dd48ff3e52d079";
  }
  if (Type === "Iphone9") {
    return "https://www.flipkart.com/apple-iphone-11-white-128-gb/p/itme32df47ea6742?pid=MOBFWQ6B7KKRXDDS&lid=LSTMOBFWQ6B7KKRXDDSULUZ0N&marketplace=FLIPKART&q=iphone&store=tyy%2F4io&spotlightTagId=BestsellerId_tyy%2F4io&srno=s_1_1&otracker=search&otracker1=search&fm=Search&iid=3f8877a3-f08e-4247-be8d-9b29e964475c.MOBFWQ6B7KKRXDDS.SEARCH&ppt=sp&ppn=sp&ssid=iedh9k8usg0000001678190152521&qH=0b3f45b266a97d70";
  }
  if (Type === "Iphone14") {
    return "https://www.flipkart.com/apple-iphone-14-midnight-128-gb/p/itm9e6293c322a84?pid=MOBGHWFHECFVMDCX&lid=LSTMOBGHWFHECFVMDCXBOYSND&marketplace=FLIPKART&q=iphone14&store=tyy%2F4io&srno=s_1_1&otracker=search&otracker1=search&fm=Search&iid=1fe154f1-461a-4e8c-bbcd-e021cdb5a161.MOBGHWFHECFVMDCX.SEARCH&ppt=sp&ppn=sp&qH=694e31eb1200eb29";
  }
  if (Type === "Iphone11") {
    return "https://www.flipkart.com/apple-iphone-11-white-128-gb/p/itme32df47ea6742?pid=MOBFWQ6B7KKRXDDS&lid=LSTMOBFWQ6B7KKRXDDSULUZ0N&marketplace=FLIPKART&q=iphone&store=tyy%2F4io&spotlightTagId=BestsellerId_tyy%2F4io&srno=s_1_1&otracker=search&otracker1=search&fm=Search&iid=3f8877a3-f08e-4247-be8d-9b29e964475c.MOBFWQ6B7KKRXDDS.SEARCH&ppt=sp&ppn=sp&ssid=iedh9k8usg0000001678190152521&qH=0b3f45b266a97d70";
  }
  if (Type === "Iphone12") {
    return "https://www.flipkart.com/apple-iphone-12-black-64-gb/p/itma2559422bf7c7?pid=MOBFWBYZU5FWK2VP&lid=LSTMOBFWBYZU5FWK2VPFMEI56&marketplace=FLIPKART&q=iphone12&store=tyy%2F4io&srno=s_1_1&otracker=search&otracker1=search&fm=Search&iid=9b16f360-e6db-4cba-be04-1ced3f18613c.MOBFWBYZU5FWK2VP.SEARCH&ppt=sp&ppn=sp&ssid=1p3ubpiyw00000001678193907604&qH=ad588135f239b88b";
  }
  if (Type === "Iphone13") {
    return "https://www.flipkart.com/apple-iphone-13-starlight-128-gb/p/itmc9604f122ae7f?pid=MOBG6VF5ADKHKXFX&lid=LSTMOBG6VF5ADKHKXFXQGX7PK&marketplace=FLIPKART&q=iphone13&store=tyy%2F4io&srno=s_1_1&otracker=search&otracker1=search&fm=Search&iid=8dbea3ba-442b-4f07-a678-5bf668d77cb9.MOBG6VF5ADKHKXFX.SEARCH&ppt=sp&ppn=sp&ssid=a6s23gwvw00000001678193944480&qH=7d4afaedfc628b80";
  }
};

async function hello(Type) {
  let fact;
  const url = link(Type);
  await axios
    .get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const price = $("._30jeq3");
      const p = price.html();
      const sub = p.substring(1);
      fact = {
        fact: `Current price of ${Type} is ${sub}`,
      };
    })
    .catch(function (error) {
      console.error("hello");
    });
  return fact;
}
module.exports = { hello };
