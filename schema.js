const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

//Hard coded data just for now, JSON Server to be used later
const customers = {
  id: "1",
  name: "Wes Jonke",
  email: "test@gmail.com",
  age: 37,
};

//customer type
//used in the root, types and structure set up here
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    email: { type: GraphQLString },
  }),
});

//root query
//uses the type we defined above
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  customer: {
    type: CustomerType,
  },
});

module.exports = new GraphQLSchema({});
