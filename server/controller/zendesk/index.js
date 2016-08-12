class ZendeskController {
  constructor(zendeskApi) {
    this.zendeskApi = zendeskApi;
  }

  createTicket({ subject, name, email, message }) {
    return this.searchCustomer(email).then(customers => {
      return customers.length && customers[0].id
        ? customers[0].id
        : this.createUser({ name, email }).then(({ user }) => user.id);
    }).then(customerId => {
      return this.zendeskApi.tickets.create({
        subject,
        requester_id: customerId,
        comment: { body: message },
      });
    });
  }

  createUser({ name, email }) {
    return this.zendeskApi.users.create({ name, email });
  }

  listCustomers() {
    return this.zendeskApi.users.list();
  }

  searchCustomer(email) {
    return this.listCustomers()
      .then(users => users.filter(user => user.email === email));
  }
}

export default ZendeskController;
