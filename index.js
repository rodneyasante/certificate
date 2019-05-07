const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')
const canvas = createCanvas(200, 200, 'pdf')
const ctx = canvas.getContext('2d')
const csv = require('csv-parser');

let results = []

ctx.font = '20px Arial'

fs.createReadStream("data.csv")
    .pipe(csv())
    .on('data', function (data) {
        results.push(data)
    })
    .on('end', async function () {
        let image = await loadImage('./squid.png')
        try {
            for (const result of results) {
                let name = result.NAME
                console.log(results)
                console.log(name)
                ctx.drawImage(image, 0, 0, 200, 200)
                ctx.fillText(name, 50, 100)
                canvas.createPDFStream().pipe(fs.createWriteStream(`${__dirname}/output/${name}.pdf`))
            }
        } catch (err) {
            console.log("error", err)
        }
        console.log('CSV file successfully processed');
    });  