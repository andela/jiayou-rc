import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean
} from "graphql";

import GraphQLDate from "graphql-date";

const UserAddress = new GraphQLObjectType({
  name: "UserAddress",
  description: "Describes address of a user",
  fields: () => ({
    emails: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.emails) {
          return data.emails[0].address;
        }
        return "No available email for user";
      }
    },
    verified: {
      type: GraphQLBoolean,
      resolve: (data) => {
        if (data.emails) {
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

export default UsersType;
