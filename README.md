# express-batteries

`express-batteries` is an extension for Express that simplifies building structured, modular, and scalable web applications. It provides a declarative way to define controllers, dependency injection, data validation, and OpenAPI schema generation in an expressive and clean manner.

---

## 📦 Installation

Before installing, create a `.npmrc` file at the root of your project with the following content:

```bash
@jsr:registry=https://npm.jsr.io
```

Then install the package using your preferred package manager:

```bash
# Bun
bun install express-batteries

# npm
npm install express-batteries

# Yarn
yarn add express-batteries

# pnpm
pnpm add express-batteries
```

---

## `tsconfig.json` Configuration

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "express-batteries/plugin"
      }
    ]
  }
}
```

This plugin allows the use of interfaces in dependency injection without tightly coupling to specific implementations.

---

## Basic Structure

```ts
import { ExpressBatteries } from "express-batteries";
import { createImageModule } from "./modules/image";

const app = new ExpressBatteries();

createImageModule(app);

app.listen(3000);
```

---

## Module Definition

```ts
import {
  type ExpressBatteriesApplication,
  createModule,
} from "express-batteries";
import { ImageController } from "./presentation/controllers/ImageController";
import { ApplicationLoader } from "./application/dependecyLoader";
import { InfrastructureLoader } from "./infrastructure/dependecyLoader";

export const createImageModule = (app: ExpressBatteriesApplication) => {
  createModule({
    app,
    path: "/api/v1",
    controllers: [ImageController],
    webSockets: [TopicWsGetway],
    dependencyLoaders: [InfrastructureLoader, ApplicationLoader],
  });
};
```

---

## Controllers

```ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Params,
  Query,
  Middleware,
  Inject,
  ResponseType,
} from "express-batteries";

import type { Request, Response } from "express";
import multer from "multer";
import typia from "typia";

import { UploadFileSchema, updateImageSchema, ImageQuerySchema } from "../schemas/imageCrudSchemas";
import { UploadImageHandler } from "../../application/commands/upload/UploadImageHandler";

@Controller("/images")
export class ImageController {
  @Post("/", { tags: ["images"] })
  @Middleware(multer({ storage: multer.memoryStorage() }).single("file"))
  @Body(UploadFileSchema)
  @ResponseType({ code: 201, description: "Image uploaded", schema: typia.random<Image>() })
  async upload(
    req: Request,
    res: Response,
    @Inject(UploadImageHandler) handler: UploadImageHandler
  ) {
    const { title, description } = req.body;
    const file = req.file;
    const image = await handler.execute({
      title,
      description,
      url: file?.originalname ?? "",
    });
    res.status(201).json(image);
  }
}
```

---

## Dependency Injection

To define dependency injection, create a module that registers the controllers or WebSocket gateways. Then, define services which can be injected manually or through a function that receives the container. This function can be imported where needed to keep dependency injection logic decoupled and modular.

```ts
import { Container } from "inversify";
import { UploadImageHandler } from "./commands/upload/UploadImageHandler";

export const ApplicationLoader = (container: Container) => {
  container.bind(UploadImageHandler).to(UploadImageHandler);
};
```

You can also inject interfaces with the plugin:

```ts
@inject(ExpressBatteriesTs.name<IImageRepository>())
repository: ImageRepository;
```

Dependency loaders can be **asynchronous** functions, allowing you to perform setup steps such as starting event emitters:

```ts
import { ExpressBatteriesTs } from "express-batteries";
import type { Container } from "inversify";
import type { ICacheManager } from "../domain/ports/ICacheManager";
import type { IImageRepository } from "../domain/ports/IimageRepository";
import { RedisCacheManager } from "./cache/redis.cache.manager";
import { ImageRepository } from "./database/repositories/ImageRepository";
import { ExampleEventEmitter } from "./events/ExampleEventEmitter";

export const InfrastructureLoader = async (container: Container) => {
  container
    .bind<RedisCacheManager>(ExpressBatteriesTs.name<ICacheManager>())
    .to(RedisCacheManager);

  container
    .bind<ImageRepository>(ExpressBatteriesTs.name<IImageRepository>())
    .to(ImageRepository);

  const exampleEventEmitter = new ExampleEventEmitter();
  await exampleEventEmitter.start();

  container
    .bind<ExampleEventEmitter>(ExampleEventEmitter)
    .toConstantValue(exampleEventEmitter);
};
```

---

## Validation and Types

Use schemas with `valibot` to define request body , params and queries :

```ts
import * as v from "valibot";

export const UploadFileSchema = v.object({
  title: v.string(),
  description: v.string(),
});

export const updateImageSchema = v.object({
  title: v.optional(v.string()),
  description: v.optional(v.string()),
});
```

---

## OpenAPI Generation

The `@ResponseType` and `@Body` decorators allow automatic OpenAPI documentation generation based on the defined types using valibot or sample objects (e.g., generated with typia).

```ts
@ResponseType({
  code: 200,
  description: "Image updated",
  schema: typia.random<Image>(),
})
```

---

## Key Features

- Clear modularization by domain.
- Decoupled dependency injection.
- Declarative validation.
- Automatic documentation generation.

