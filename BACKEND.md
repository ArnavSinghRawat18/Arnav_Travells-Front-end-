Backend configuration
=====================

The frontend expects the backend base URL to be available as an environment variable named `REACT_APP_API_BASE`.

Development
-----------
Create a `.env.local` file in the project root (this file is typically gitignored) and add:

REACT_APP_API_BASE=https://arnav-travels-backend.onrender.com

Then install dependencies and start the dev server:

```powershell
npm install
npm start
```

Notes
-----
- The file `.env.local` is automatically loaded by Create React App in development. For production, set `REACT_APP_API_BASE` in your deployment environment.
- The codebase uses `src/services/api.js` (axios instance) which reads `process.env.REACT_APP_API_BASE`.
