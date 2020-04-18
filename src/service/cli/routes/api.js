'use strict';
const {nanoid} = require(`nanoid`);
const {OfferType, HttpCode} = require(`../../../constants`);

const {Router} = require(`express`);
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
  const {title, picture, description, type, sum, category} = req.body;

  if (!title || !description || !sum || !category || !description) {
    res.status(HttpCode.BAD_REQUEST).send(`Please, fill all the required fields`);
    return;
  }

  if (!Object.keys(OfferType).includes(type)) {
    res.status(HttpCode.BAD_REQUEST).send(`Wrong type`);
    return;
  }

  req.app.locals.data.push({id: nanoid(6), title, picture, description, type, sum, category});
  res.sendStatus(HttpCode.OK_CREATED);
}

function getOffer(req, res) {
  const {offerId} = req.params;
  if (!offerId) {
    res.status(HttpCode.BAD_REQUEST).send(`Please, give offer Id`);
    return;
  }

  const offer = req.app.locals.data.find((item) => item.id === offerId);
  if (offer) {
    res.send(offer);
  } else {
    res.status(404).send(`Offer not found.`);
  }
}

function updateOffer(req, res) {
  const {offerId} = req.params;
  if (!offerId) {
    res.status(HttpCode.BAD_REQUEST).send(`Please, give offer Id`);
    return;
  }

  const existOfferId = req.app.locals.data.findIndex((item) => item.id === offerId);
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
  const {offerId} = req.params;
  if (!offerId) {
    res.status(HttpCode.BAD_REQUEST).send(`Please, give offer Id`);
    return;
  }

  const isOfferExist = req.app.locals.data.some((item) => item.id === offerId);
  if (isOfferExist) {
    req.app.locals.data = req.app.locals.data.filter((item) => item.id !== offerId);
    res.sendStatus(HttpCode.OK_NO_CONTENT);
  } else {
    res.status(HttpCode.NOT_FOUND).send(`Offer not found`);
  }
}

function getOrderComments(req, res) {
  const {offerId} = req.params;
  if (!offerId) {
    res.status(HttpCode.BAD_REQUEST).send(`Please, give offer Id`);
    return;
  }

  const offer = req.app.locals.data.find((item) => item.id === offerId);
  if (offer) {
    res.send(offer.comments || []);
  } else {
    res.status(HttpCode.NOT_FOUND).send(`Offer not found`);
  }
}

function createOrderComment(req, res) {
  const {offerId} = req.params;
  if (!offerId) {
    res.status(HttpCode.BAD_REQUEST).send(`Please, give offer Id`);
    return;
  }

  const existOfferId = req.app.locals.data.findIndex((item) => item.id === offerId);

  if (existOfferId === -1) {
    res.status(HttpCode.NOT_FOUND).send(`Offer not found`);
  } else {
    const {text} = req.body;
    if (text) {
      const {comments = []} = req.app.locals.data[existOfferId];
      comments.push({id: nanoid(6), text});
      req.app.locals.data[existOfferId].comments = comments;
      res.send(HttpCode.OK_CREATED);
    } else {
      res.status(HttpCode.BAD_REQUEST).send(`Need the text of a comment.`);
    }
  }
}

function deleteOrderComment(req, res) {
  const {offerId, commentId} = req.params;
  if (!(offerId && commentId)) {
    res.status(HttpCode.BAD_REQUEST).send(`Please, give offer Id and comment Id`);
    return;
  }

  const existOfferId = req.app.locals.data.findIndex((item) => item.id === offerId);
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
  const {query = ``} = req.query;
  if (query.length === 0) {
    res.status(HttpCode.BAD_REQUEST).send(`Need a search query`);
  } else {
    res.send(req.app.locals.data.filter((item) => item.title.includes(query)));
  }
}

module.exports = apiRouter;
