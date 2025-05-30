# Microsoft 365 Send Mail Example

Egyszerű Node.js alkalmazás, amely Microsoft Graph API segítségével küld e-mailt.

## Használat

1. Töltsd ki a `.env` fájlt megfelelő értékekkel (CLIENT_ID, TENANT_ID, stb).
2. Telepítsd a függőségeket:

```
npm install
```

3. Indítsd el a szervert:

```
node index.js
```

4. Küldj POST kérést:

```
POST http://localhost:3000/send
Content-Type: application/json

{
  "to": "valaki@domain.com",
  "subject": "Teszt email",
  "body": "Ez egy teszt levél a Graph API-val"
}
