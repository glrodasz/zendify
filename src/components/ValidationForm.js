import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';

export validation(strategy)(Form);
