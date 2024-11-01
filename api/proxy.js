// api/proxy.js

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { address } = req.query;

    if (!address) {
        res.status(400).json({ error: "Alamat wallet tidak diberikan" });
        return;
    }

    try {
        const apiUrl = `https://trailblazer.mainnet.taiko.xyz/s2/user/rank?address=${address}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Gagal memuat data" });
    }
};
