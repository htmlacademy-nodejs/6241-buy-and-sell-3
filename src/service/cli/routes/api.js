'use strict';
const {nanoid} = require(`nanoid`);
const {HttpCode} = require(`../../../constants`);
const {Router} = require(`express`);
const {
  offerValidation,
  offerIdValidation,
  commentValidation,
  deleteCommentValidation,
  searchQueryValidation,
} = require(`../validation`);
const {getExistedOfferId, getExistedOffer, checkOfferExist} = require(`../util`);
const apiRouter = new Router();

apiRouter
  .get(`/offers`, getOffers)
  .post(`/offers`, createOffers)
  .get(`/offers/:offerId`, getOffer)
  .put(`/offers/:offerId`, updateOffer)
  .delete(`/offers/:offerId`, deleteOrder)
  .get(`/offers/:offerId/comments`, getOrderComments)
  .post(`/offers/:offerId/comments`, createOrderComment)
  .delete(`/offers/:offerId/comments/:commentId`, deleteOrderComment)
  .get(`/categories`, getCategories)
  .get(`/search`, findOffers);

function getOffers(req, res) {
  res.send(req.app.locals.data);
}

function createOffers(req, res) {
  const error = offerValidation(req);

  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }

  const {title, picture, description, type, sum, category} = req.body;
  req.app.locals.data.push({id: nanoid(6), title, picture, description, type, sum, category});
  res.sendStatus(HttpCode.OK_CREATED);
}

function getOffer(req, res) {
  const error = offerIdValidation(req);
  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }
  const {offerId} = req.params;
  const offer = getExistedOffer(req.app.locals.data, offerId);
  if (offer) {
    res.send(offer);
  } else {
    res.status(404).send(`Offer not found.`);
  }
}

function updateOffer(req, res) {
  const error = offerIdValidation(req) || offerValidation(req);
  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }

  const {offerId} = req.params;
  const existOfferId = getExistedOfferId(req.app.locals.data, offerId);
  if (existOfferId === -1) {
    res.status(404).send(`Offer not found`);
    return;
  }
  const {title, picture, description, type, sum, category} = req.body;
  req.app.locals.data[existOfferId] = {
    ...req.app.locals.data[existOfferId],
    title,
    picture,
    description,
    type,
    sum,
    category,
  };
  res.send(`edit ${req.params.offerId} offer`);
}

function deleteOrder(req, res) {
  const error = offerIdValidation(req);
  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }

  const {offerId} = req.params;
  const isOfferExist = checkOfferExist(req.app.locals.data, offerId);
  if (isOfferExist) {
    req.app.locals.data = req.app.locals.data.filter((item) => item.id !== offerId);
    res.sendStatus(HttpCode.OK_NO_CONTENT);
  } else {
    res.status(HttpCode.NOT_FOUND).send(`Offer not found`);
  }
}

function getOrderComments(req, res) {
  const error = offerIdValidation(req);
  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }

  const {offerId} = req.params;
  const offer = getExistedOffer(req.app.locals.data, offerId);
  if (offer) {
    res.send(offer.comments || []);
  } else {
    res.status(HttpCode.NOT_FOUND).send(`Offer not found`);
  }
}

function createOrderComment(req, res) {
  const error = offerIdValidation(req) || commentValidation(req);
  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }

  const {offerId} = req.params;
  const existOfferId = getExistedOfferId(req.app.locals.data, offerId);
  if (existOfferId === -1) {
    res.status(HttpCode.NOT_FOUND).send(`Offer not found`);
  } else {
    const {text} = req.body;
    const {comments = []} = req.app.locals.data[existOfferId];
    comments.push({id: nanoid(6), text});
    req.app.locals.data[existOfferId].comments = comments;
    res.send(HttpCode.OK_CREATED);
  }
}

function deleteOrderComment(req, res) {
  const error = deleteCommentValidation(req);
  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }

  const {offerId, commentId} = req.params;
  const existOfferId = getExistedOfferId(req.app.locals.data, offerId);
  if (existOfferId === -1) {
    res.status(HttpCode.NOT_FOUND).send(`Offer not found`);
  } else {
    const {comments = []} = req.app.locals.data[existOfferId];
    req.app.locals.data[existOfferId].comments = comments.filter((comment) => comment.id !== commentId);
    res.sendStatus(HttpCode.OK_NO_CONTENT);
  }
  res.send(`delete ${req.params.commentId} comment for ${req.params.offerId} offer`);
}

function getCategories(req, res) {
  res.send(req.app.locals.data.reduce((acc, cur) => {
    const {category} = cur;
    category.forEach((item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
    });
    return acc;
  }, []).sort());
}

function findOffers(req, res) {
  const error = searchQueryValidation(req);
  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }
  const {query} = req.query;
  res.send(req.app.locals.data.filter((item) => item.title.includes(query)));
}

module.exports = apiRouter;
