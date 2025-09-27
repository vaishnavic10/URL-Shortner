const express = require("express");
const shortid = require("shortid");
const validUrl = require("valid-url");
const Url = require("../models/Url");

const router = express.Router();

router.post("/shorten", async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = "http://localhost:3000";

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json("Invalid base URL");
    }

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            if (url) {
                res.json(url);
            } else {
                const urlCode = shortid.generate();
                const shortUrl = baseUrl + "/" + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json("Server error");
        }
    } else {
        res.status(401).json("Invalid long URL");
    }
});

router.get("/:code", async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });

        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json("No URL found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error");
    }
});

module.exports = router;
