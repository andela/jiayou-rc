import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLBoolean
} from "graphql";

import GraphQLDate from "graphql-date";

import UserType from "../schemas/users.schema";
// import { Accounts } from "/lib/collections";
import * as Collections from "/lib/collections";

const UserInputType = new GraphQLInputObjectType({
  name: "UserInput",
  fields: () => ({
    createdAt: { type: GraphQLDate },
    userId: { type: GraphQLString },
    shopId: { type: GraphQLString },
    emails: { type: GraphQLString },
    verified: { type: GraphQLBoolean },
    fullName: { type: GraphQLString },
    phone: { type: GraphQLString },
    address1: { type: GraphQLString }
  })
});

const UserMutation = new GraphQLObjectType({
  name: "UserMutation",
  description: "Updates the details of a user",
  fields: () => ({
    createUser: {
      type: UserType,
      description: "Creates new user",
      args: {
        user: { type: UserInputType }
      },
      resolve: (root, { user }) => {
        Collections.Accounts.insert({ user });
      }
    }
  })
});

export default UserMutation;
