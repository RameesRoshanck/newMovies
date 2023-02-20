const { body, validationResult } = require("express-validator");

const formValidate = [
    //name validation
    body("username")
      .isString()
      .withMessage("username should be string")
      .isLength({ min: 3 })
      .withMessage("username must conatain minimum 3 characters"),
  
    // director validation
    body("director")
    .isString()
    .withMessage("Name should be string")
    .isLength({ min: 3 })
    .withMessage("Director Name must conatain minimum 3 characters"),
     
    //release Date
    body('ReleaseDate').custom(value => {
        if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
          throw new Error('Invalid release date. Date format should be YYYY-MM-DD.');
        }
        return true;
      }),
  
    // Rating validation
    body("Rating")
    .isString()
    .withMessage("rating should be string")
    .isLength({ min: 1 })
    .withMessage("rating must conatain minimum 1 Number"),
      
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      next();
    }
};

module.exports = { formValidate,validate }