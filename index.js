const express = require("express");
const axios = require("axios");
const app = express();
const TARGET = "https://toonstream.love";
const OLD_LINK = "https://telegram.me/toonstream";
const NEW_LINK = "https://telegram.me/iammaxx1";

app.use(async (req, res) => {
    try {
        const targetUrl = TARGET + req.url;
        const r = await axios.get(targetUrl, {
            headers: {
                "user-agent": req.headers["user-agent"],
                "accept": req.headers["accept"] || "*/*"
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
            res.send(r.data); // lun
        }

    } catch (err) {
        res.status(500).send("Lora bahenchod: " + err.message);
    }
});

app.listen(3000, () => console.log(`Lora bahenchod`));
