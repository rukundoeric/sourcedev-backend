/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';
import _ from 'lodash';
import schemas from './schemas';

export default schema => (req, res, next) => {
  const data = req.body;
  if (_.has(schemas, schema)) {
    const chosenSchema = _.get(schemas, schema);
    const validationResult = Joi.validate(data, chosenSchema, {
      abortEarly: false,
    });
    if (!validationResult.error) {
      req.body = data;
      next();
    } else {
      const allErrors = [];
      validationResult.error.details.forEach((errors) => {
        const findError = allErrors.filter(error => error === errors.context.label);
        if (findError.length === 0) {
          allErrors.push(errors.context.label);
        }
      });
      return res.status(400).send({
        status: 400,
        error: { message: allErrors },
      });
    }
  }
};
