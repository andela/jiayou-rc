import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from "graphql";

// Define the address list object
const ShopAddress = new GraphQLObjectType({
  name: "ShopAddress",
  description: "Describes the address of a shop",
  fields: () => ({
    company: { type: GraphQLString },
    address1: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.address1) {
          return data.address1;
        }
        return "No address available";
      }
    },
    address2: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.address2) {
          return data.address2;
        }
        return "No address avaialable";
      }
    },
    city: { type: GraphQLString },
    region: { type: GraphQLString },
    country: { type: GraphQLString },
    phone: { type: GraphQLString }
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
        if (data.addressBook) {
          return data.addressBook[0];
        }
        return "No available address for store";
      }
    },
    emails: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.emails) {
          return data.emails[0].address;
        }
        return "No avaialable email for store";
      }
    }
  })
});

export default ShopsType;
