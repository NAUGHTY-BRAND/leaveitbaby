const express = require("express");
const axios = require("axios");

const app = express();
const TARGET = "https://toonstream.love";
const OLD_LINK = "https://telegram.me/toonstream";
const NEW_LINK = "https://t.me/iammaxx1";

app.use(async (req, res) => {
    try {
        const targetUrl = TARGET + req.url;

        const r = await axios.get(targetUrl, {
            headers: {
                "user-agent": req.headers["user-agent"] || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
                "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "upgrade-insecure-requests": "1",
                "accept": req.headers["accept"] || "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "accept-language": req.headers["accept-language"] || "en-US,en;q=0.9",
                "referer": "https://toonstream.love/",
                "origin": "https://toonstream.love"
            },
            responseType: "arraybuffer"
        });

        const contentType = r.headers["content-type"];
        res.set("content-type", contentType);

        if (contentType && contentType.includes("text/html")) {
            let html = r.data.toString("utf-8");
            html = html.replaceAll(OLD_LINK, NEW_LINK);
            html = html.replaceAll(TARGET, "");
            html = html.replaceAll("//toonstream.love", "");
            res.send(html);
        } else {
            res.send(r.data); //lun
        }

    } catch (err) {
        res.status(500).send("Proxy Error: " + err.message);
    }
});
app.listen(3000, () => console.log('Ben14'));
