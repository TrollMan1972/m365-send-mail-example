const express = require('express');
const credential = require('./authConfig');
const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

const graphClient = Client.initWithMiddleware({
  authProvider: {
    getAccessToken: async () => {
      const token = await credential.getToken('https://graph.microsoft.com/.default');
      return token.token;
    }
  }
});

app.post('/send', async (req, res) => {
  const { to, subject, body } = req.body;
  try {
    await graphClient.api('/users/' + process.env.SENDER_EMAIL + '/sendMail').post({
      message: {
        subject: subject,
        body: {
          contentType: 'Text',
          content: body
        },
        toRecipients: [
          {
            emailAddress: {
              address: to
            }
          }
        ]
      }
    });
    res.send('Email sent.');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => console.log('Send Mail API running at http://localhost:3000'));
