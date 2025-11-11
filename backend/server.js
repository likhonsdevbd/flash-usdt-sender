const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/transactions', (req, res) => {
    const { amount, recipientAddress } = req.body;

    if (!amount || !recipientAddress) {
        return res.status(400).json({ error: 'Missing amount or recipientAddress' });
    }

    const transactionId = crypto.randomUUID();

    // Simulate a quick transaction
    setTimeout(() => {
        res.status(200).json({
            transactionId,
            status: 'completed',
            amount,
            recipientAddress,
            message: 'Transaction successful'
        });
    }, 1500); // 1.5 second delay
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
