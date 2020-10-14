const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

//Hard coded data just for now, JSON Server to be used later
// const customers = [
//   { id: '1', name: 'Wes Jonke', email: 'test@gmail.com', age: 37 },
//   { id: '2', name: 'Sam Smith', email: 'test@gmail.com', age: 22 },
//   { id: '3', name: 'Jim Jones', email: 'test@gmail.com', age: 34 },
//   { id: '4', name: 'somyoung guuy', email: 'test@gmail.com', age: '89' },
// ];

//sets up customer typing
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
    //get individual customer by id

    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      //this will return the customer that matches the id passed in compared to the hard coded customers using a for loop.
      resolve(parentValue, args) {
        return (
          //new data using json server, this could also be for any other api,we are using using axios
          axios
            .get('http://localhost:3000/customers/' + args.id)
            .then((res) => res.data)
        );

        //original data, hardcoded above
        // for (let i = 0; i < customers.length; i++) {
        //   if (customers[i].id == args.id) {
        //     return customers[i];
        //   }
        // }
      },
    },

    //gets a list of all customers
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        // using axios ans json server
        return axios
          .get('http://localhost:3000/customers')
          .then((res) => res.data);

        // using hardcoded data above
        // return customers;
      },
    },
  },
});

//Mutations, like queries on they can add edit or delete the data.... mutating it...

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ////////////////////////////
    addCustomer: {
      type: CustomerType,
      args: {
        //we wrap the arg in non-null to make it a required field
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, args) {
        //just making a simple post request to the api, the api is set to receive these from above with the required data
        return axios
          .post('http://localhost:3000/customers', {
            name: args.name,
            email: args.email,
            age: args.age,
          })
          .then((res) => res.data);
      },
    },

    ////////////////////////////////////
    deleteCustomer: {
      type: CustomerType,
      args: {
        //we wrap the arg in non-null to make it a required field, we only need the id here
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        //just making a simple delete request to the api, the api is set to receive these from above with the required data
        return axios
          .delete('http://localhost:3000/customers/' + args.id)
          .then((res) => res.data);
      },
    },

    ////////////////////////////////////
    editCustomer: {
      type: CustomerType,
      args: {
        //we wrap the arg in non-null to make it a required field, we only need the id required here because we may not want to update the whole object
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        //just making a simple edit request to the api, the api is set to receive these from above with the required data
        return axios
          .patch('http://localhost:3000/customers/' + args.id, args)
          .then((res) => res.data);
      },
    },
    ////////////////////////
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
