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

## WebSocket Integration

Express Batteries provides built-in support for WebSocket integration using decorators. Below is an example of how to create a WebSocket gateway and handle WebSocket events.

### Example: WebSocket Gateway

```typescript
import { WsGateway, OnWsEvent, WsSocket, WsServer, WsBody, WsMiddlewares } from 'express-batteries';
import { Server, Socket } from 'socket.io';

// Middleware for WebSocket events
const WsMiddleware = async (server: Server, socket: Socket, ctx: { body: string }, next: () => Promise<void>) => {
    console.log("Middleware executed for event", ctx.body);
    ctx.body = "Modified by middleware"; // Modify the message body
    await next(); // Proceed to the next middleware or handler
};

@WsGateway()
class ChatGateway {
    // Event handler for joining a WebSocket room
    @OnWsEvent("joinRoom")
    joinRoom(@WsSocket() socket: Socket) {
        socket.join("chat-room"); // Join the room named "chat-room"
        socket.emit("roomJoined", "You have joined the chat room"); // Notify the client
    }

    // Event handler for sending messages to the WebSocket room
    @OnWsEvent("sendMessage")
    @WsMiddlewares([WsMiddleware]) // Apply middleware to this event
    handleMessage(@WsServer() server: Server, @WsBody() message: string) {
        console.log("Received message:", message);
        server.to("chat-room").emit("newMessage", message); // Broadcast the message to the room
    }
}
```

### Explanation

1. **`@WsGateway()`**: Marks the class as a WebSocket gateway.
2. **`@OnWsEvent(eventName)`**: Listens for a specific WebSocket event (e.g., `joinRoom`, `sendMessage`).
3. **`@WsSocket()`**: Injects the WebSocket `Socket` instance into the handler.
4. **`@WsServer()`**: Injects the WebSocket `Server` instance into the handler.
5. **`@WsBody()`**: Injects the message body sent by the client.
6. **`@WsMiddlewares()`**: Adds middleware to process the event before reaching the handler.

### Registering the Gateway

To use the WebSocket gateway, register it in your application module:

```typescript
import { createModule, expressBatteries } from 'express-batteries';
import { ChatGateway } from './path-to-your-gateway';

const app = expressBatteries();

createModule({
    app,
    path: '/api',
    webSockets: [ChatGateway],
});

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
```

### Testing the WebSocket

1. Connect to the WebSocket server using a client (e.g., `socket.io-client`).
2. Emit the `joinRoom` event to join the chat room.
3. Emit the `sendMessage` event to send a message to the room.

## Caching and Cache Invalidation

Express Batteries provides decorators for caching method results and invalidating cache entries. These decorators simplify cache management in your application.

### Example: Using `@cached`

The `@cached` decorator caches the result of a method for a specified duration. You can also provide a custom key generator function.

```typescript
import { cached } from "express-batteries";

class ExampleService {
  @cached({ EX: 10 }, (methodName, args) => `${methodName}:${args[0]}`)
  async getData(id: string) {
    console.log("Fetching data...");
    return { id, value: Math.random() };
  }
}

const service = new ExampleService();
service.getData("123"); // Logs "Fetching data..." and caches the result.
service.getData("123"); // Returns cached result without logging.
```

### Example: Using `@invalidateCache`

The `@invalidateCache` decorator invalidates cache entries based on a key or a key generator function.

```typescript
import { invalidateCache } from "express-batteries";

class ExampleService {
  @invalidateCache("getData:123")
  async clearCache() {
    console.log("Cache invalidated.");
  }
}

const service = new ExampleService();
service.clearCache(); // Logs "Cache invalidated." and removes the cache entry for "getData:123".
```

### Combining `@cached` and `@invalidateCache`

You can use both decorators in the same class to manage cache effectively.

```typescript
class ExampleService {
  @cached({ EX: 10 }, () => "key")
  async getData(id: string) {
    return { id, value: Math.random() };
  }

  @invalidateCache("key")
  async updateData(id: string, newValue: any) {
    console.log("Updating data...");
    return { id, value: newValue };
  }
}

const service = new ExampleService();
service.getData("123"); // Caches the result.
service.updateData("123", "newValue"); // Invalidates the cache for "getData:123".
```

