import axios from "axios";

class OrderController {
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

export default OrderController;
