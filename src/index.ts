
import express from 'express';
import router from './routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
const app = express();

app.use(express.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,  { explorer: true }));

app.use("/api", router)
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
