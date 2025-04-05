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

@Controller()
class a {
    @Get("/a")
    @Body(v.object({
        name: v.string(),
    }))
    @ResponseType({
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
});

console.log("sd");

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
