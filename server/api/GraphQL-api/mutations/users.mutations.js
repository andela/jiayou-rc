import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLList
} from "graphql";

import UsersType from "../schemas/users.schema";
import { Accounts } from "/lib/collections";
import { Random } from "meteor/random";

const Email = new GraphQLInputObjectType({
  name: "UserEmail",
  description: "Changes the email details of a user",
  fields: () => ({
    address: { type: GraphQLString },
    verified: { type: GraphQLBoolean },
    provides: { type: GraphQLString }
  })
});

const addressDetails = new GraphQLInputObjectType({
  name: "AddressDetails",
  description: "Changes address details details of a user",
  fields: () => ({
    country: { type: GraphQLString },
    fullName: { type: GraphQLString },
    address1: { type: GraphQLString },
    postal: { type: GraphQLString },
    city: { type: GraphQLString },
    region: { type: GraphQLString },
    phone: { type: GraphQLString },
    isShippingDefault: { type: GraphQLBoolean },
    isBillingDefault: { type: GraphQLBoolean },
    isCommercial: { type: GraphQLBoolean }
  })
});

const Profile = new GraphQLInputObjectType({
  name: "UserProfile",
  description: "Changes address of a user",
  fields: () => ({
    addressBook: { type: new GraphQLList(addressDetails) }
  })
});

const UserMutation = new GraphQLObjectType({
  name: "UserMutation",
  description: "Changes the details of a user",
  fields: () => ({
    addUser: {
      type: UsersType,
      args: {
        userId: { type: GraphQLString },
        shopId: { type: GraphQLString },
        emails: { type: new GraphQLList(Email) },
        profile: { type: Profile }
      },
      resolve(root, args) {
        return Accounts.insert({
          userId: Random.id(),
          shopId: Random.id(),
          emails: [{
            address: args.emails[0].address,
            verified: args.emails[0].verified,
            provides: args.emails[0].provides
          }],
          profile: {
            addressBook: [
              {
                country: args.profile.addressBook[0].country,
                fullName: args.profile.addressBook[0].fullName,
                address1: args.profile.addressBook[0].address1,
                postal: args.profile.addressBook[0].postal,
                city: args.profile.addressBook[0].city,
                region: args.profile.addressBook[0].region,
                phone: args.profile.addressBook[0].phone,
                isShippingDefault: args.profile.addressBook[0].isShippingDefault,
                isBillingDefault: args.profile.addressBook[0].isBillingDefault,
                isCommercial: args.profile.addressBook[0].isCommercial
              }
            ]
          }
        });
      }
    }
  })
});

export default UserMutation;
