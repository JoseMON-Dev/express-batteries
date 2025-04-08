import {
    Controller,
    createModule,
    expressBatteries,
    Get,
    ResponseType,
    swaggerUI,
} from "./src/index";
import { inject, injectable } from "inversify";

@injectable()
class service {
    a() {
        console.log("asdsad");
    }
}

@Controller()
class a {
    constructor(
        @inject(service) public service: service,
    ) {}

    @Get("/a")
    @ResponseType({
        headers: ["application/gzip", "application/json"],
        code: 200,
    })
    get() {
        this.service.a();
    }
}
const app = expressBatteries();

createModule({
    app,
    path: "/str",
    controllers: [a],
    services: [service],
});

const { html, json } = await swaggerUI({
    documentation: {
        info: {
            title: "PixPro Backend",
            version: "1.0.0",
            description: "Api docs",
        },
    },
});

app.use("/", html);
app.use("/json", json);

app.listen(8080, () => {
    console.log(` 🚀 Server ready at http://localhost:${8080}`);
});
