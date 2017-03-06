import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean,
  GraphQLFloat
} from "graphql";

import GraphQLDate from "graphql-date";

import OrdersType from "../schemas/orders.schema";
import { Orders } from "/lib/collections";

const OrderMutation = new GraphQLObjectType({
  name: "OrderMutation",
  description: "Changes an order",
  fields: () => ({
    addOrder: {
      type: OrdersType,
      args: {
        userId: { type: GraphQLString },
        shopId: { type: GraphQLString },
        email: { type: GraphQLString },
        sessionId: { type: GraphQLString }
      },
      resolve(root, args) {
        Orders.insert({
          userId: args.userId,
          shopId: args.shopId,
          email: args.email,
          sessionId: args.sessionId
        });
      }
    }
  })
});

export default OrderMutation;
