# Backend Skeleton API
This backend skeleton works with Tediousjs, but can be adjust to any database manager package

## How to run for first time

1. Create an .env file from the .env.example file and replace the values with your configuration
2. npm install
3. npm start

### NPM scripts

- **npm start**  
Starts the application in development and rebuilds on change
- **npm run docs**  
Generates api docs in the public/apidoc folder. The docs can be accessed [here](http://localhost:8080/apidoc)

### Application structure

- components  
Here we will store all different components used by the app. There are already some exception and validation components  
- config  
Here we will store any configuration data organized in files  
- constants  
Here we will store any constant needed  
- controllers  
Here we will store the controllers.  
- middlewares  
Here we will store the middlewares  
- routes  
Here we will store the routes. Every route should be registered in the index file  
- services  
Here we will store services
- utils  
Here we will store helper/util functions as needed

#### Notes about asyncWrapperMiddleware

This middleware is created to offer us a better way of dealing with async errors.
Express can handle only synchronous errors and if we throw an error on an async method it will crash the app if its not caught.  

Typically, to handle async errors you would do

```javascript
    async function testController(req, res, next) {
      await someAsyncMethod().catch(next);
    }

    // or

    async function testController2(req, res, next) {
      try {
        await someAsyncMethod();
      } catch (e) {
        next(e);
      }
    }

    // by using the asyncWrapperMiddleware you can use the async code and throw like normal synchronous function
    async function testController3(req, res, next) {
        await someAsyncMethod();
        // if the method above throws it will be caught by the middleware
        // you can also throw by yourself
        throw new Error("Some error");
    }
```

#### Notes about custom Response methods

Inside the Response object we have 2 helper methods (attached via the ResponseMiddleware) called `success(data: any)` and `error(error: any)`.  
Please use these methods for responding back to the client as they will provide a generic response structure for the client to use.  

```javascript
    // success example
    // it will send back to the client the following structure
    // {
    //    "success": true,
    //    "data": {
    //       "message": "Some message"
    //    }
    // }
    function textController(req, res, next) {
      res.success({ message: "Some message" });
    }

    // error example
    // it will send back to the client the following structure
    // {
    //    "success": false,
    //    "error": {
    //       "status": 400,
    //       "name": "BadRequest"
    //       "message": "Error message",
    //       "data": {} // any additional data that we want to provide
    //    }
    // }
    function textController2(req, res, next) {
      // using the exceptions in /component/exceptions
      res.error(new BadRequest("Error message"));
      // using the builtin error object
      res.error(new Error("Error message"));
      // or custom error
      res.error({ name: "Error name", message: "Error message" });
    }
```
