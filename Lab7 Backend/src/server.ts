import express, { Application } from "express"
import cors from "cors"
import { errorHandler } from "./middleware/errorHandler"
import { initialize } from "./_helpers/db"
import userController from "./users/users.controller"
import accountsController from "./accounts/accounts.controller"
import cookieParser from "cookie-parser"
import swaggerUi from "swagger-ui-express"
import { swaggerDocument } from "./swagger.doc"

const app: Application = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));
app.use(cookieParser());

// Middleware to ensure DB is initialized before any request
let initPromise: Promise<void> | null = null;
app.use(async (req, res, next) => {
    if (!initPromise) {
        initPromise = initialize();
    }
    try {
        await initPromise;
        next();
    } catch (err) {
        next(err);
    }
});

const options: any = {
    customCssUrl: 'https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css',
    customJs: [
        'https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js',
        'https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js'
    ]
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.get("/", (req, res) => res.redirect("/api-docs"))
app.use("/accounts", accountsController)
app.use("/users", userController)

app.use(errorHandler)

const PORT = process.env.PORT || 4000


if (!process.env.VERCEL) {
    initialize().then(() => {
        app.listen(PORT, () => {
            console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`);
        });
    });
}

export default app;