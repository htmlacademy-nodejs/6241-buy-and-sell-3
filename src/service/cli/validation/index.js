'use strict';

const Joi = require(`@hapi/joi`);
const {OfferType} = require(`../../../constants`);

const getRequiredCondition = () => ({is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required()});
const offerScheme = Joi.object().keys({
  id: Joi.string().optional(),
  title: Joi.string().min(6).when(`id`, getRequiredCondition()),
  picture: Joi.string(),
  description: Joi.string().min(30).when(`id`, getRequiredCondition()),
  type: Joi.string().valid(...Object.values(OfferType)).when(`id`, getRequiredCondition()),
  sum: Joi.number().when(`id`, getRequiredCondition()),
  category: Joi.array().items(Joi.string()).min(1).when(`id`, getRequiredCondition()),
});

const commentScheme = Joi.object().keys({
  id: Joi.string(),
  text: Joi.string().min(5).required(),
});

const offerValidation = function ({body}) {
  const {error = {}} = offerScheme.validate(body);
  return error.details;
};

const offerIdValidation = function ({params}) {
  const {error = {}} = Joi.object().keys({
    offerId: Joi.string().required(),
  }).validate(params);
  return error.details;
};

const commentValidation = function ({body}) {
  const {error = {}} = commentScheme.validate(body);
  return error.details;
};

const deleteCommentValidation = function ({params}) {
  const {error = {}} = Joi.object().keys({
    offerId: Joi.string().required(),
    commentId: Joi.string().required(),
  }).validate(params);
  return error.details;
};

const searchQueryValidation = function ({query}) {
  const {error = {}} = Joi.object().keys({
    query: Joi.string().min(3).required(),
  }).validate(query);
  return error.details;
};

module.exports = {
  offerValidation,
  offerIdValidation,
  commentValidation,
  deleteCommentValidation,
  searchQueryValidation,
};
