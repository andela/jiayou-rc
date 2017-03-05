import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLList
} from "graphql";

import  UsersType from "../schemas/users.schema";
import { Accounts } from "/lib/collections";

const Email = new GraphQLInputObjectType({
  name: "UserEmail",
  description: "Describes the email details of a user",
  fields: () => ({
    address: { type: GraphQLString },
    verified: { type: GraphQLBoolean },
    provides: { type: GraphQLString }
  })
});

const UserMutation = new GraphQLObjectType({
  name: "UserMutation",
  fields: () => ({
    addUser: {
      type: UsersType,
      args: {
        userId: { type: GraphQLString },
        shopId: { type: GraphQLString },
        emails: { type: new GraphQLList(Email) }
      },
      resolve(root, args) {
        // console.log(args.emails);
        console.log(args.emails[0].address, args.emails[0].verified, args.emails[0].provides);
        return Accounts.insert({
          userId: args.userId, shopId: args.shopId, emails: [{
            address: args.emails[0].address, verified: args.emails[0].verified, provides: args.emails[0].provides}]
        });
      }
    }
  })
});

export default UserMutation;
