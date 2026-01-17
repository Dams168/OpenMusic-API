import app from './server/index.js';

const PORT = process.env.PORT || 3000;
const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

app.listen(PORT, () => {
  console.log(`Server is running on http://${host}:${PORT}`);
});
