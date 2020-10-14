// Get Queries
// {
//       customer(id: "3") {
//         id
//         name
//         email
//         age
//       }
//     }

//     {
//       customers {
//         id,
//         name,
//         email,
//         age,
//       }
//     }

//     // mutations
//     mutation{
//       addCustomer(
//         name:"New Guye",
//         email:"test@gmil.com",
//         age:54)
//     //   this is what we want returned from the request
//       {
//         id,
//         name,
//         email,
//         age
//       }
//     }

//     mutation{
//       deleteCustomer(id:"2")
//     //   this is what we want returned from the request, this will be null unless we grab it before the delete as per usual
//       {
//         id,
//         name,
//         email,
//         age
//       }
//     }

//     mutation{
//       editCustomer(id:"1", age:48)
//     //   this is what we want returned from the request
//       {
//         id,
//         name,
//         email,
//         age
//       }
//     }
