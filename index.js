const express = require("express");
const axios = require("axios");

const app = express();

app.use(async (req, res) => {
  try {
    const targetUrl = `https://toonstream.love${req.originalUrl}`;

    const response = await axios.get(targetUrl, {
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9,ur;q=0.8,sd;q=0.7",
        "cache-control": "max-age=0",
        "cookie": "_ga=GA1.1.2114310479.1754738189; cf_clearance=TsAH6ugyBCtIZN8dzeqmXfwAviMzWEstBV2sxp7cQbk-1754739514-1.2.1.1-so4gqEMS40P4mKUFyvekpWJIFKeoCRbXppGwPI8LE1gDgCOii0mGo_GKx9DERhuAJOK9TXzNhdldqduVR68DKmul9UBYcGShpsI70.cT7aqKJiJQtX94CyU96mls5q7dJSattX38VI0_VNEAQUTRN_WiQH3pIcp9qg.GA5ZaRt0Xwmw9nO28Bb4tU2NM0JoJKGDaVilw7Lm9WnXDhwYZPWiFvlWeC.ceAEWCup_LZuk; _ga_XGZ7V4LSXG=GS2.1.s1754738188$o1$g1$t1754739522$j51$l0$h0; _ga_GBQ02L3T55=GS2.1.s1754738197$o1$g1$t1754739522$j52$l0$h0; _ga_CH77SBWZGZ=GS2.1.s1754738189$o1$g1$t1754739522$j54$l0$h0",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
      },
      responseType: "arraybuffer" 
    });

    let data = response.data;
    if (/text\/html/.test(response.headers['content-type'])) {
      data = data.toString().replace(/https?:\/\/toonstream\.love/g, "http://localhost:3000");
    }

    res.set(response.headers);
    res.send(data); //lun

  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => console.log("✅ Proxy running on http://localhost:3000"));
