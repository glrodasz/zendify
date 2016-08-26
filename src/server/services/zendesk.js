/**
 * Zendesk service class
 */
class ZendeskService {
  /**
   * Zendesk service constructor
   * @param  {ZendeskNodeApi} zendeskNodeApi - A ZendeskNodeApi instance
   * @return {void}
   */
  constructor(zendeskNodeApi) {
    this.api = zendeskNodeApi;
  }

  /**
   * Create a new Zendesk ticket
   * @param  {Object} Payload - Payload information
   * @param  {string} Payload.name - Customer's name
   * @param  {string} Payload.agentEmail - Agent's email
   * @param  {string} Payload.email - Customer's email
   * @param  {string} Payload.subject - Ticket's subject
   * @param  {string} Payload.message - Ticket's message
   * @return {Promise} - A promise with the created ticket
   */
  createTicket({ agentName, agentEmail, name, email, subject, message }) {
    return this.searchAgent(agentEmail)
      .then(([agent]) => {
        return agent && agent.id
          ? agent.id
          : this.createAgent({ agentName, agentEmail })
            .then(({ user }) => user.id);
      }).then(agentId => {
        return this.api.tickets.create({
          subject,
          requester: {
            name,
            email,
          },
          submitter_id: agentId,
          comment: { body: message },
        });
      });
  }

  /**
   * Create a new Zendesk agent user
   * @param  {Object} Agent - Agent information
   * @param  {string} agentName - Agent's name
   * @param  {string} agentEmail - Agent's email
   * @return {Promise} - A promise with the created agent
   */
  createAgent({ agentName, agentEmail }) {
    return this.api.users.create({
      name: agentName,
      email: agentEmail,
      role: 'agent',
    });
  }

  /**
   * Search a Zendesk agent by email
   * @param  {string} email - Agent's email
   * @return {Promise} - A promise with the found agent
   */
  searchAgent(email) {
    return this.api.search
      .list(`query=type:user role:agent role:admin email:${email}`);
  }
}

export default ZendeskService;
