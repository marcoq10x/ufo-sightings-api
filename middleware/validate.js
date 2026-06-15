const Joi = require('joi');

const validateSighting = (req, res, next) => {
    const schema = Joi.object({
        location: Joi.string().required(),
        date: Joi.string().required(),
        shape: Joi.string().required(),
        description: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    
    if (error) {
        // If the data doesn't pass validation, return a 400 status and the error message
        return res.status(400).json({ 
            success: false, 
            message: error.details[0].message 
        });
    }
    
    next();
};

module.exports = { validateSighting };