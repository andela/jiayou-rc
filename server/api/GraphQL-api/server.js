import express from "express";
import GraphQLHTTP from "express-graphql";
import bodyParser from "body-parser";
import schema from "./schema";
import UserController from "./controllers/user.controller";


const app = express();
const PORT = 8000;

app.use("/graphql", bodyParser.json(), GraphQLHTTP({
  schema,
  graphiql: true,
  pretty: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/users", UserController.getUsers);

app.get("/api/processed-orders/:email", UserController.getCompletedOrders);

app.get("/api/pending-orders/:email", UserController.getPendingOrders);

app.listen(PORT, () => {
  console.log(`GraphQL server started on port ${PORT}`);
});
