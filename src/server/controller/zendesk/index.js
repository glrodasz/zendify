/**
 * Zendesk controller class
 */
class ZendeskController {
  /**
   * Zendesk controller constructor
   * @param  {Zendesk} zendeskApi - A Zendesk Object
   * @return {void}
   */
  constructor(zendeskApi) {
    this.zendeskApi = zendeskApi;
  }

  /**
   * Create a new Zendesk ticket
   * @param  {Object} Payload - Payload information
   * @param  {string} Payload.name - Customer's name
   * @param  {string} Payload.email - Customer's email
   * @param  {string} Payload.subject - Ticket's subject
   * @param  {string} Payload.message - Ticket's message
   * @return {Promise} - A promise with the created ticket
   */
  createTicket({ name, email, subject, message }) {
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

  /**
   * Create a new Zendesk user
   * @param  {Object} User - User information
   * @param  {string} name - User's name
   * @param  {string} email - User's email
   * @return {Promise} - A promise with the created user
   */
  createUser({ name, email }) {
    return this.zendeskApi.users.create({ name, email });
  }

  /**
   * List the users of Zendesk
   * @return {Promise} - A promise with the users list
   */
  listUsers() {
    return this.zendeskApi.users.list();
  }

  /**
   * Search a customer of Zendesk
   * @param  {string} email - Customer's email
   * @return {Promise} - A promise with the found customer
   */
  searchCustomer(email) {
    return this.listUsers()
      .then(users => users.filter(user => user.email === email));
  }
}

export default ZendeskController;
