import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';

const app = new Koa();
const router = new Router();
const port = 5000; // Change the port if needed

// Middleware
app.use(cors());
app.use(bodyParser());

// Test Route
router.get('/test', async (ctx) => {
  ctx.body = { message: 'Koa backend is working!' };
});

// Apply routes
app.use(router.routes()).use(router.allowedMethods());

// Start server
app.listen(port, () => {
  console.log(`Koa server running on http://localhost:${port}`);
});
