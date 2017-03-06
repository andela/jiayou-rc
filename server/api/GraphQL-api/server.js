import express from "express";
import GraphQLHTTP from "express-graphql";
import bodyParser from "body-parser";
import schema from "./schema";
import axios from "axios";

const app = express();
const PORT = 8000;

app.use("/graphql", bodyParser.json(), GraphQLHTTP({
  schema,
  graphiql: true,
  pretty: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get products
app.get("/api/products", (request, response) => {
  axios.post(`http://${request.headers.host}/graphql`,
    {
      query: `{
        products {
          title
          _id
          vendor
          price
          inventoryQuantity
        }
      }`
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      response.status(200).json(res.data);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
});

// Get shops
app.get("/api/shops", (request, response) => {
  axios.post(`http://${request.headers.host}/graphql`,
    {
      query: `{
        shops {
          name
          _id
          description
          status
        }
      }`
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      response.status(200).json(res.data);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
});

app.get("/api/users", (request, response) => {
  axios.post(`http://${request.headers.host}/graphql`,
    {
      query: `
      {
        users {
          userId
          shopId
          emails{
            address
            verified
            provides
          }
          profile{
            country
            fullName
            address1
            city
            region
            phone
            postal
            isShippingDefault
            isBillingDefault
            isCommercial
          }
        }
      }`
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      response.status(200).json(res.data);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
});

app.get("/api/processed_orders/:email", (request, response) => {
  const email = request.params.email.replace(/"/g, "");
  axios.post(`http://${request.headers.host}/graphql`,
    {
      query: `
        {
  orders(email: "${email}", orderStatus: "coreOrderWorkflow/completed"){
    _id
    userId
    shopId
    status
    workflow
    createdAt
    email
    packed
    shipped
    amount
    currency
  }
}
      `
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      if (res.data.data.orders.length) {
        response.status(200).json(res.data);
      }
      response.status(404).send("No Data Found for Orders");
    })
    .catch((error) => {
      response.status(400).send(error);
    });
});

app.get("/api/cancelled_orders/:email", (request, response) => {
  const email = request.params.email.replace(/"/g, "");
  axios.post(`http://${request.headers.host}/graphql`,
    {query: `
      {
        orders (emailID: "${email}",
        orderStatus: "coreOrderWorkflow/canceled"
        )
        {
    _id
    userId
    shopId
    status
    workflow
    createdAt
    email
    packed
    shipped
    amount
    currency
  }
      }`
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      if (res.data.data.orders.length) {
        response.status(200).json(res.data);
      }
      response.status(404).send("No Data Found for Orders");
    })
    .catch((error) => {
      response.status(400).send(error);
    });
});

app.listen(PORT, () => {
  console.log(`GraphQL server started on port ${PORT}`);
});
