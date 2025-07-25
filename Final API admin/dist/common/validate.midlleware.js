"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateMidlleware = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ValidateMidlleware {
    constructor(classToValidate) {
        this.classToValidate = classToValidate;
    }
    execute({ body }, res, next) {
        const instance = (0, class_transformer_1.plainToClass)(this.classToValidate, body);
        (0, class_validator_1.validate)(instance).then((errors) => {
            if (errors.length > 0) {
                res.status(422).send(errors);
            }
            else {
                next();
            }
        });
    }
}
exports.ValidateMidlleware = ValidateMidlleware;
