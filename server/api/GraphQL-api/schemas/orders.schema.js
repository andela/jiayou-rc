import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLFloat
} from "graphql";

import GraphQLDate from "graphql-date";


// Define Order items
const OrderItems = new GraphQLObjectType({
  name: "OrderItems",
  description: "Returns details of products ordered",
  fields: () => ({
    title: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    productId: { type: GraphQLString },
    type: { type: GraphQLString },
    shopId: { type: GraphQLString }
  })
});

const ShippingAddress = new GraphQLObjectType({
  name: "ShippingAddress",
  description: "Returns delivery address for an order",
  fields: () => ({
    country: { type: GraphQLString },
    fullName: { type: GraphQLString },
    address1: { type: GraphQLString },
    address2: { type: GraphQLString },
    city: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});

// Define OrdersType
const OrdersType = new GraphQLObjectType({
  name: "Orders",
  description: "Returns specified orders",
  fields: () => ({
    _id: { type: GraphQLString },
    userId: { type: GraphQLString },
    shopId: { type: GraphQLString },
    status: {
      type: GraphQLString,
      resolve: (data) => {
        return data.workflow.status;
      }
    },
    workflow: {
      type: GraphQLString,
      resolve: (data) => {
        return data.workflow.status;
      }
    },
    items: { type: new GraphQLList(OrderItems) },
    createdAt: {
      type: GraphQLDate,
      resolve: (data) => {
        return data.createdAt;
      }
    },
    email: {
      type: GraphQLString,
      resolve: (data) => {
        return data.email;
      }
    },
    packed: {
      type: GraphQLBoolean,
      resolve: (data) => {
        return data.shipping.packed;
      }
    },
    shipped: {
      type: GraphQLBoolean,
      resolve: (data) => {
        return data.shipping.shipped;
      }
    },
    deliveryAddress: {
      type: ShippingAddress,
      resolve: (data) => {
        return data.shipping[0].address;
      }
    },
    amount: {
      type: GraphQLFloat,
      resolve: (data) => {
        return data.billing[0].paymentMethod.amount;
      }
    },
    currency: {
      type: GraphQLString,
      resolve: (data) => {
        return data.billing[0].paymentMethod.currency;
      }
    }
  })
});

export default OrdersType;
