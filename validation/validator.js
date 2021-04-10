const { body, validationResult } = require('express-validator');
const articleValidationRules = () => {
  return [
    body('title')
      .isLength({ min: 3 })
      .withMessage('must be at least 3 chars long')
      .isLength({ max: 21 })
      .withMessage('must be less than 21 chars long'),
    body('description')
      .isLength({ min: 3 })
      .withMessage('must be at least 3 chars long')
      .isLength({ max: 100 })
      .withMessage('must be less than 100 chars long')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  console.log('errors.array()', errors.array());
  let errorsStr = errors
    .array()
    .map(err => `${err.param}: ${err.msg}`)
    .join(', ');
  console.log('errorsStr', errorsStr);

  return res.status(422).json({ errors: errorsStr });
};

module.exports = {
  articleValidationRules,
  validate
};
