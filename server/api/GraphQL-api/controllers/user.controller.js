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

  // Get processed orders
  static getCompletedOrders(request, response) {
    const email = request.params.email.replace(/"/g, "");
    axios.post(`http://${request.headers.host}/graphql`,
      {
        query: `
        {
          orders(email: "${email}",
            orderStatus: "coreOrderWorkflow/completed")
              {
                _id
                userId
                shopId
                status
                workflow
                createdAt
                email
                packed
                shipped
                amount
                currency
                }
              }`
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        if (res.data.data.orders.length) {
          response.status(200).json(res.data);
        }
        response.status(404).send("No Data Found for Orders");
      })
      .catch((error) => {
        response.status(400).send(error);
      });
  }

  // Get pending orders
  static getPendingOrders(request, response) {
    // if (request.params("email") === "") {
    //   response.status(404).send("No email supplied");
    // }
    console.log(request);
    const email = request.params.email.replace(/"/g, "");
    axios.post(`http://${request.headers.host}/graphql`,
      {
        query: `
      {
        orders(email: "${email}",
              orderStatus: "coreOrderWorkflow/processing")
            {
              _id
              userId
              shopId
              status
              workflow
              createdAt
              email
              packed
              shipped
              amount
              currency
            }
          }`
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        if (res.data.data.orders.length) {
          response.status(200).json(res.data);
        }
        response.status(404).send("No Data Found for Orders");
      })
      .catch((error) => {
        response.status(400).send(error);
      });
  }
}

export default UserController;
