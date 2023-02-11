import express from "express";
import { Low } from "lowdb"; //Import the LowDB module. Uses a JSON file to create our "database"
import { JSONFile } from "lowdb/node";
import morgan from "morgan";
import setupToDoRouter from "./controllers/routes.js";

export default async function createTodo() {
  const app = express();

  const adapter = new JSONFile("db.json");
  const db = new Low(adapter);

  await db.read();

  //Checks if there is any data in the database. If not, we give default data.
  db.data = db.data || { todos: [] };

await db.write()

  app.use(express.json());
  app.use("/todo", function(request, response,next){
    if(request.query.admin === "true"){
      next();
    } else {
      response.status(401).json({
        success: false
      });
    }
  })

  app.use("/todo",morgan('tiny'),setupToDoRouter(db));
  return app;
}
