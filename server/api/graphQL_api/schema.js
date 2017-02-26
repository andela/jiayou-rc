import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean,
  GraphQLFloat
} from "graphql";

import { Products, Shops, Accounts, Orders } from "/lib/collections";
import GraphQLDate from "graphql-date";

// Define ProductsType
const ProductsType = new GraphQLObjectType({
  name: "Products",
  description: "Returns specified products",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    type: { type: GraphQLString },
    vendor: { type: GraphQLString },
    isSoldOut: { type: GraphQLBoolean },
    price: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.price.range) {
          return data.price.range;
        }
        return data.price;
      }
    },
    inventoryQuantity: { type: GraphQLInt }
  })
});

// Define the address list object
const ShopAddress = new GraphQLObjectType({
  name: "ShopAddress",
  description: "Describes the address of a shop",
  fields: () => ({
    company: { type: GraphQLString },
    address1: { type: GraphQLString },
    address2: { type: GraphQLString },
    city: { type: GraphQLString },
    region: { type: GraphQLString },
    country: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});

const UserAddress = new GraphQLObjectType({
  name: "UserAddress",
  description: "Describes address of a user",
  fields: () => ({
    emails: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.emails.length) {
          return data.emails[0].address;
        }
        return "No available email for user";
      }
    },
    verified: {
      type: GraphQLBoolean,
      resolve: (data) => {
        if (data.emails.length) {
          return data.emails[0].verified;
        }
        return null;
      }
    },
    country: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.profile.addressBook) {
          return data.profile.addressBook[0].country;
        }
        return "No available country for user";
      }
    },
    fullName: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.profile.addressBook) {
          return data.profile.addressBook[0].fullName;
        }
        return "No available name for user";
      }
    },
    phone: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.profile.addressBook) {
          return data.profile.addressBook[0].phone;
        }
        return "No phone number for user";
      }
    },
    address1: { type: GraphQLString }
  })
});

// Define ShopsType
const ShopsType = new GraphQLObjectType({
  name: "Shops",
  description: "Returns specified shops",
  fields: () => ({
    _id: { type: GraphQLID },
    status: { type: GraphQLString },
    name: { type: GraphQLString },
    description: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.description) {
          return data.description;
        }
        return "No description for store available";
      }
    },
    addressBook: {
      type: ShopAddress,
      resolve: (data) => {
        if (data.address) {
          return data.addressBook[0];
        }
        return "No available address for store";
      }
    },
    emails: {
      type: GraphQLString,
      resolve: (data) => {
        return data.emails[0].address;
      }
    }
  })
});

// Define UsersType
const UsersType = new GraphQLObjectType({
  name: "Users",
  description: "Returns specified users",
  fields: () => ({
    _id: { type: GraphQLID },
    createdAt: { type: GraphQLDate },
    userId: { type: GraphQLString },
    shopId: { type: GraphQLString },
    addressBook: {
      type: UserAddress,
      resolve: (data) => {
        if (data.profile.addressBook) {
          return data.addressBook[0];
        }
        return "No available address for user";
      }
    }
  })
});

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
    _id: { type: GraphQLID },
    userId: { type: GraphQLID },
    shopId: { type: GraphQLID },
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

// define query object
const query = new GraphQLObjectType({
  name: "Query",
  description: "Server configuration for GraphQL API",
  fields: () => ({
    products: {
      type: new GraphQLList(ProductsType),
      description: "Returns products",
      resolve: () => {
        return Products.find.fetch();
      }
    },
    shops: {
      type: new GraphQLList(ShopsType),
      description: "Returns shops",
      resolve: () => {
        return Shops.find.fetch();
      }
    },
    users: {
      type: new GraphQLList(UsersType),
      description: "Returns users",
      resolve: () => {
        return Accounts.find.fetch();
      }
    },
    orders: {
      type: new GraphQLList(OrdersType),
      description: "Returns Orders",
      resolve: (root, args) => {
        if (!args.email) {
          return "This requires the email parameter to work";
        } else if (args.email === "admin") {
          return Orders.find.fetch();
        } else if (args.email === "admin" && args.orderStatus) {
          return Orders.find({ "workflow.status": args.orderStatus }).fetch();
        } else if (args.orderStatus) {
          return Orders.find({ "email": args.email, "workflow.status": args.orderStatus }).fetch();
        }
        return Orders.find({ email: args.email });
      }
    }
  })
});

const schema = new GraphQLSchema({
  query
});

export default schema;
