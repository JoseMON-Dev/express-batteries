import * as v from "valibot";
import {
    Body,
    Controller,
    CreateModule,
    expressBatteries,
    Get,
    ResponseType,
    swaggerUI,
} from "./src/index";
import { inject, injectable } from "inversify";

@injectable()
class service {
}

@Controller()
class a {
    constructor(
        @inject(service) public service: service,
    ) {}

    @Get("/a")
    @Body(v.object({
        name: v.string(),
    }))
    @ResponseType({
        headers: ["application/gzip", "application/json"],
        code: 200,
    })
    get() {
    }
}
const app = expressBatteries();

CreateModule({
    app,
    path: "/img",
    controllers: [a],
    services: [service],
});

const [html, json] = await swaggerUI({
    documentation: {
        info: {
            title: "PixPro Backend",
            version: "1.0.0",
            description: "Api docs",
        },
    },
});

app.use("/json", json);

app.listen(8080, () => {
    console.log(` 🚀 Server ready at http://localhost:${8080}`);
});
