const Joi = require("joi");

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(50).required().messages({
            "any.required": "所有欄位必須填寫",
            "string.min": "使用者名稱必續大於2個字元",
        }),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .min(6)
            .max(100)
            .required()
            .messages({
                "any.required": "所有欄位必須填寫",
                "string.min": "信箱長度必須大於6個字元",
                "string.email": "請輸入正確信箱格式",
            }),
        password: Joi.string().min(6).max(255).required().messages({
            "any.required": "所有欄位必須填寫",
            "string.min": "密碼必續大於6個字元",
        }),
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .min(6)
            .max(100)
            .email({ tlds: { allow: false } })

            .required()
            .messages({
                "string.email": "信箱格式錯誤",
                "any.required": "所有欄位必須填寫",
                "string.min": "信箱長度必須大於6個字元",
            }),
        password: Joi.string().min(6).max(255).required().messages({
            "any.required": "所有欄位必須填寫",
            "string.min": "密碼必續大於6個字元",
        }),
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
