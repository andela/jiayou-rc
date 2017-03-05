import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLList
} from "graphql";

import UserType from "../schemas/users.schema";
import * as Collections from "/lib/collections";

const EmailInput = new GraphQLInputObjectType({
  name: "EmailInput",
  fields: () => ({
    provides: { type: GraphQLString },
    address: { type: GraphQLString },
    verified: { type: GraphQLBoolean }
  })
});

const UserEmail = new GraphQLInputObjectType({
  name: "UserEmail",
  description: "Describes the address of a user",
  fields: () => ({
    data: { type: EmailInput }
  })
});

const UserMutation = new GraphQLObjectType({
  name: "UserMutation",
  fields: () => ({
    addUser: {
      type: UserType,
      args: {
        userId: { type: GraphQLString },
        shopId: { type: GraphQLString },
        emails: { type: UserEmail }
      },
      resolve(root, args) {
        return Collections.Accounts.insert({userId: args.userId, shopId: args.shopId, emails: args.emails});
        // return args;
      }
    }
  })
});

export default UserMutation;
