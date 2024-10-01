import axios from 'axios'
import 'dotenv/config'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import express from 'express'

const app = express()
const port = 3000

app.get('/crawl', async (req, res) => {
    res.send('Crawling...')
    console.log("Crawling...")
    
    const pageHTML = await axios.get("https://www.dbs.com/sailing/index.html")

    const bookingMonth = pageHTML.data.search("October Registration") 

    if (bookingMonth === -1) {
        console.log(process.env.M)
        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API});
        
        mg.messages.create('sandboxa7923d6c145d4897b4de2209605b8364.mailgun.org', {
            from: "Mailgun Email <mailgun@sandboxa7923d6c145d4897b4de2209605b8364.mailgun.org>",
            to: ["wbillgao@gmail.com"],
            subject: "DBS Sailing Booking Month",
            text: "It is not booking for October anymore",
            html: `<h1> Booking month is not October! </h1> 
            <a href='https://www.dbs.com/sailing/index.html'> DBS Link </a>`
        })
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.log(err)); // logs any error  
    }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
