import Joi from 'joi';

const ticketScheme = Joi.object({
  agentEmail: Joi.string().email(),
  agentName: Joi.string(),
  email: Joi.string().email(),
  message: Joi.string(),
  name: Joi.string(),
  subject: Joi.string(),
});

export default ticketScheme;
