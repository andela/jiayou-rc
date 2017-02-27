import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean
} from "graphql";

// Define ProductsType
const ProductsType = new GraphQLObjectType({
  name: "Products",
  description: "Returns specified products",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    type: { type: GraphQLString },
    vendor: {
      type: GraphQLString,
      resolve: (data) => {
        if (data.vendor) {
          return data.vendor;
        }
        return "No vendor specified";
      }
    },
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

export default ProductsType;
