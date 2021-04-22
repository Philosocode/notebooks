const { body, oneOf } = require("express-validator");

const { entityExists } = require("../common/common.model");

exports.createConceptValidationRules = function() {
  return [
    body("name", "Concept name is required.").notEmpty().trim().custom(async (value, { req }) => {
      const conceptExists = await entityExists("concept", { name: value, user_id: req.user.id });
      if (conceptExists) {
        return Promise.reject("Concept with that name already exists");
      }
    })
  ];
}

exports.updateConceptValidationRules = function() {
  return [
    body("name", "Concept name must be a string.")
      .isString()
      .notEmpty()
      .trim()
      .optional()
      .custom(async (value, { req }) => {
        const conceptExists = await entityExists("concept", { name: value, user_id: req.user.id });
        if (conceptExists) {
          return Promise.reject("Concept with that name already exists");
        }
    }),
    body("tags", "Tags must be an array of strings").optional().isArray(),
    body("tags.*", "Tags must be an array of strings").optional().isString()
  ];
}