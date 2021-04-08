const { body, validationResult } = require('express-validator');
const articleValidationRules = () => {
  return [
    body('title')
      .isLength({ min: 3 })
      .withMessage('must be at least 3 chars long')
      .isLength({ max: 10 })
      .withMessage('must be less than 10 chars long'),
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
  let extractedErrors = [];
  console.log('errors.array()', errors.array());
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
  articleValidationRules,
  validate
};
