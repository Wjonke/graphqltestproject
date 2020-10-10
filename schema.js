const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

//Hard coded data just for now, JSON Server to be used later
const customers = [
  { id: '1', name: 'Wes Jonke', email: 'test@gmail.com', age: 37 },
  { id: '2', name: 'Sam Smith', email: 'test@gmail.com', age: 22 },
  { id: '3', name: 'Jim Jones', email: 'test@gmail.com', age: 34 },
  { id: '4', name: 'somyoung guuy', email: 'test@gmail.com', age: '89' },
];

//customer type
//used in the root, types and structure set up here
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
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
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      //this will return the customer that matches the id passed in compared to the hard coded customers using a for loop.
      resolve(parentValue, args) {
        for (let i = 0; i < customers.length; i++) {
          if (customers[i].id == args.id) {
            return customers[i];
          }
        }
      },
    },
    //gets a list of all customers in the array
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return customers;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
