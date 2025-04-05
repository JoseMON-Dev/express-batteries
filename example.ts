import "reflect-metadata";
import type { Request, Response } from "express";
import {
    Body,
    Controller,
    expressBatteries,
    Get,
    Inject,
    Module,
    Params,
    Post,
    Query,
    ResponseType,
    swaggerUI,
} from "./src";
import * as v from "valibot";
import swaggerUi from "swagger-ui-express";
import express from "express";
import { Container, injectable } from "inversify";

class Myerror extends Error {
    constructor(
        message: string,
        public errors: string[],
        public code: number,
    ) {
        super(message);
        this.name = "MyError";
    }
}

expressBatteries({
    ErrorClass: Myerror,
});
const app = express();

@injectable()
class Service {
    getUser(id: string) {
        return { id };
    }
}
@Controller("/users")
class UserController {
    @Get("/:id", {
        tags: ["Users"],
    })
    @Params(v.object({ id: v.string() }))
    async getUser(
        req: Request,
        res: Response,
        @Inject(Service) service: Service,
    ) {
        const id = req.params.id as string;
        res.json(service.getUser(id));
    }

    @Post("/", {
        security: [{
            bearerAuth: [],
        }],
    })
    @Body(v.object({ name: v.string() }))
    @ResponseType(
        201,
        "User created",
        v.object({
            name: v.string(),
            id: v.string(),
        }),
    )
    async getUsers(req: Request, res: Response) {
        return [];
    }
}

const container = new Container();
container.bind(Service).to(Service);
Module(container, [UserController], "/users", app);

const [ui, json] = await swaggerUI({
    documentation: {
        info: { title: "API Documentation", version: "1.0.0" },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
});
app.use("/api-docs", swaggerUi.serve, ui);
app.use("/api-docs-json", json);

app.listen(process.env.PORT || 3000, () => {
    console.log(
        `Server is running on port http://localhost:${
            process.env.PORT || 3000
        }`,
    );
});
