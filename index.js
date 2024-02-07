const express = require('express');
const redis = require('redis');

const app = express();
const client = await redis.createClient({
  url: 'redis://redis-server:6379',
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));
client.set('visits', 0);
app.get('/', async (req, res) => {
  const value = await client.get('visits');
  await client.set('visits', parseInt(value) + 1);
  res.send('Number of visits: ' + value);
  // client.quit();
});

app.listen(8081, () => {
  console.log('Listening on port 8081');
});
