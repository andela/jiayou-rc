import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString
} from "graphql";

const maskErrors = require("graphql-errors").maskErrors;
import ProductsType from "./schemas/products.schema";
import OrdersType from "./schemas/orders.schema";
import UsersType from "./schemas/users.schema";
import ShopsType from "./schemas/shops.schema";
import UserMutation from "./mutations/users.mutations";
import OrderMutation from "./mutations/orders.mutations";
import { Products, Shops, Accounts, Orders } from "/lib/collections";

// define query object
const query = new GraphQLObjectType({
  name: "Query",
  description: "Server configuration for GraphQL API",
  fields: () => ({
    products: {
      type: new GraphQLList(ProductsType),
      description: "Returns products",
      resolve: () => {
        return Products.find().fetch();
      }
    },
    shops: {
      type: new GraphQLList(ShopsType),
      description: "Returns shops",
      resolve: () => {
        return Shops.find().fetch();
      }
    },
    users: {
      type: new GraphQLList(UsersType),
      description: "Returns users",
      resolve: () => {
        return Accounts.find().fetch();
      }
    },
    orders: {
      type: new GraphQLList(OrdersType),
      description: "Returns Orders",
      args: {
        email: { type: GraphQLString },
        orderStatus: { type: GraphQLString }
      },
      resolve: (root, args) => {
        if (args.email === undefined) {
          // WORK ON THIS
          return "The email field is required";
        } else if (args.email === "admin" && args.orderStatus) {
          return Orders.find({ "workflow.status": args.orderStatus }).fetch();
        } else if (args.email === "admin") {
          return Orders.find().fetch();
        } else if (args.orderStatus) {
          return Orders.find({ "email": args.email, "workflow.status": args.orderStatus }).fetch();
        }
        return Orders.find({ email: args.email }).fetch();
      }
    }
  })
});

maskErrors(OrderMutation);

const schema = new GraphQLSchema({
  query: query,
  mutation: UserMutation
});

export default schema;
