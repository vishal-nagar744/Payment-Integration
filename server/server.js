const express = require('express');
const cors = require('cors');

const app = express();

// Default configuration (sabhi origins allow karta hai)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

app.use(express.json());

// Aapke endpoints yahan...
app.post('/api/payment', (req, res) => {
  const { amount, userUpi, paymentApp } = req.body;
  if (!amount || !userUpi || !paymentApp) {
    return res.status(400).json({ error: "Sabhi fields jaruri hain." });
  }
  console.log(`Payment request: Amount: ${amount}, User UPI: ${userUpi}, Payment App: ${paymentApp}`);
  console.log(`Payment request sent from ujjawalsol@ybl to ${userUpi}`);
  res.json({ message: "Payment request successfully sent!" });
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
