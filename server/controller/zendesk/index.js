class ZendeskController {
  constructor(zendeskApi) {
    this.zendeskApi = zendeskApi;
  }

  createTicket({ subject, name, email, message }) {
    return this.searchCustomer(email).then(customer => {
      return customer && customer.id
        ? customer.id
        : this.createUser({ name, email }).then(user => {
          return user.id;
        });
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
    return this.zendeskApi.users.list({ role: 'end-user' });
  }

  searchCustomer(email) {
    return this.listCustomers().then(users => {
      // TODO: Remover console.log
      console.log('USERS', users);
      return users.filter(user => user.email === email);
    });
  }
}

export default ZendeskController;
