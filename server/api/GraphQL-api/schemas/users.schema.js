import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList
} from "graphql";

import GraphQLDate from "graphql-date";

const UserProfile = new GraphQLObjectType({
  name: "Profile",
  description: "Get address details for user",
  fields: () => ({
    country: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.addressBook) {
          return data.addressBook[0].country;
        }
        return "A user has no country";
      }
    },
    fullName: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.addressBook) {
          return data.addressBook[0].fullName;
        }
        return "A user has no name";
      }
    },
    address1: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.addressBook) {
          return data.addressBook[0].address1;
        }
        return "A user has no address";
      }
    },
    city: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.addressBook) {
          return data.addressBook[0].city;
        }
        return "A user has no city";
      }
    },
    region: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.addressBook) {
          return data.addressBook[0].region;
        }
        return "A user has no region";
      }
    },
    phone: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.addressBook) {
          return data.addressBook[0].phone;
        }
        return "A user has no phone number";
      }
    },
    postal: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.addressBook) {
          return data.addressBook[0].postal;
        }
        return "A user has no postal code";
      }
    },
    isShippingDefault: {
      type: GraphQLBoolean,
      resolve: (data) => {
        if (data.addressBook) {
          return data.addressBook[0].isShippingDefault;
        }
        return "Unknown";
      }
    },
    isBillingDefault: {
      type: GraphQLBoolean,
      resolve: (data) => {
        if (data.addressBook) {
          return data.addressBook[0].isBillingDefault;
        }
        return "Unknown";
      }
    },
    isCommercial: {
      type: GraphQLBoolean,
      resolve: (data) => {
        if (data.addressBook) {
          return data.addressBook[0].isCommercial;
        }
        return "Unknown";
      }
    }
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
        return "A user has no email";
      }
    },
    profile: {
      type: UserProfile,
      resolve: (data) => {
        if (!data.profile) {
          return "A user has no address";
        }
        return data.profile;
      }
    }
  })
});

export default UsersType;
