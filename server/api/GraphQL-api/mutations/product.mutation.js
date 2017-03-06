import {
  GraphQLString,
  GraphQLObjectType
  // GraphQLInputObjectType,
  // GraphQLBoolean,
  // GraphQLList
} from "graphql";

import ProductsType from "../schemas/products.schema";
import { Products } from "/lib/collections";

const ProductMutation = new GraphQLObjectType({
  name: "ProductMutation",
  description: "Changes made to product",
  fields: () => ({
    addProduct: {
      type: ProductsType,
      args: {
        title: {type: GraphQLString},
        description: {type: GraphQLString}
        // shopId: {type: GraphQLString},
        // price: {type: GraphQLString}
      },
      resolve(root, args) {
        Products.insert({
          title: args.title,
          description: args.description
          // shopId: args.shopId,
          // price: args.price
        });
      }
    }
  })
});

export default ProductMutation;
