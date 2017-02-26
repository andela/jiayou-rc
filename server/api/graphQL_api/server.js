import express from "express";
import GraphQLHTTP from "express-graphql";
import schema from "./schema";
import axios from "axios";

const app = express();
const PORT = 8000;

// Get products


app.use("/graphql", GraphQLHTTP({
  schema,
  graphiql: true,
  pretty: true
}));

app.listen(PORT, () => {
  console.log(`GraphQL server started on port ${PORT}`);
});
