import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList
} from "graphql";

import GraphQLDate from "graphql-date";

const UserAddress = new GraphQLObjectType({
  name: "UserAddress",
  description: "Describes address of a user",
  fields: () => ({
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

const Email = new GraphQLObjectType({
  name: "Email",
  description: "Get email details for a user",
  fields: () => ({
    address: {
      type: GraphQLString,
      resolve: (data) => {
        if (data) {
          return data.address;
        }
        return "No email for user";
      }
    },
    verified: {
      type: GraphQLBoolean,
      resolve: (data) => {
        if (data) {
          return data.verified;
        }
        return "Unable to verify email";
      }
    },
    provides: {
      type: GraphQLString,
      resolve: (data) => {
        if (data) {
          return data.provides;
        }
        return "Unable to get provider";
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
    emails: {
      type: new GraphQLList(Email),
      resolve: (data) => {
        if (data) {
          return data.emails;
        }
        return "No emails details for user";
      }
    },
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
