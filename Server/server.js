const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 3001
const baseAddress = "https://testmenuorderapi.azurewebsites.net"
const menuURL = baseAddress + "/MenuItem"
const orderURL = baseAddress + "/Order"

app.get("/menu", (req, res) => {
    axios(menuURL)
    .then(response => {
        res.json(response.data)
        //console.log(response.data)
    })
})

app.post('/order', async (req, res) => {
    if (req.body === null || req.body === undefined) {
      console.error('Request body is null');
      res.status(400).send('Bad Request');
      return;
    }
  
    try {
      console.log(req.body);
      const response = await axios.post(orderURL, req.body, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      console.log('Order Added: ', req.body);
      res.status(200).json({ message: 'Order added successfully!', data: response.data });
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while adding the order.');
    }
  });

app.listen(PORT, () => {console.log('Server is running on PORT: ', PORT)})