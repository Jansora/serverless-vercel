const QRCode = require('qrcode');
const { createCanvas } = require('canvas');

module.exports = async (req, res) => {
    const url = req.query.url || 'https://vercel.com';

    try {
        const canvas = createCanvas(200, 200);
        await QRCode.toCanvas(canvas, url);

        const base64Image = canvas.toDataURL().split(';base64,').pop();

        const img = Buffer.from(base64Image, 'base64');

        res.setHeader('Content-Type', 'image/png');
        res.send(img);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};
