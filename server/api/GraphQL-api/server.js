import express from "express";
import GraphQLHTTP from "express-graphql";
import bodyParser from "body-parser";
import schema from "./schema";
import UserController from "./controllers/user.controller";
import OrderController from "./controllers/order.controller";


const app = express();
const PORT = 8000;

app.use("/graphql", bodyParser.json(), GraphQLHTTP({
  schema,
  graphiql: true,
  pretty: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/users", UserController.getUsers);

app.post("/api/users", UserController.createUser);

app.get("/api/processed-orders/:email", OrderController.getCompletedOrders);

app.get("/api/pending-orders/:email", OrderController.getPendingOrders);

app.listen(PORT, () => {
  console.log(`GraphQL server started on port ${PORT}`);
});
