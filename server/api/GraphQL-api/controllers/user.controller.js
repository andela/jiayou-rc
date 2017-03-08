import axios from "axios";

class UserController {
  // Method to get users
  static getUsers(request, response) {
    axios.post(`http://${request.headers.host}/graphql`,
      {
        query: `
      {
        users {
          userId
          shopId
          emails{
            address
            verified
            provides
          }
          profile{
            country
            fullName
            address1
            city
            region
            phone
            postal
            isShippingDefault
            isBillingDefault
            isCommercial
          }
        }
      }`
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        response.status(200).json(res.data);
      })
      .catch((error) => {
        response.status(400).send(error);
      });
  }

  static createUser(request, response) {
    const isShippingDefault = (request.body.isShippingDefault === "true");
    const isBillingDefault = (request.body.isBillingDefault === "true");
    const isCommercial = (request.body.isCommercial === "true");
    axios.post(`http://${request.headers.host}/graphql`,
      {
        mutation: `{
          addUser(
            emails:  [{
              provides: "${request.body.provides}",
              address: "${request.body.address}",
              verified: ${request.body.verified}
            }],
            profile:{
              addressBook:[{
                country: "${request.body.country}",
                fullName: "${request.body.fullName}",
                address1: "${request.body.address1}",
                postal: "${request.body.postal}",
                city: "${request.body.city}",
                region: "${request.body.region}",
                phone: "${request.body.phone}",
                isShippingDefault: ${isShippingDefault},
                isBillingDefault: ${isBillingDefault},
                isCommercial: ${isCommercial}
              }]
            }
          )
        }`
      },
      {
        headers: {
          "Content-Type": "application/graphql"
        }
      })
      .then((res) => {
        res.status(201).json({message: "User successfully created"});
      })
      .catch((error) => {
        response.status(400).send(error);
      });
  }
}

export default UserController;
