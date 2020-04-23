'use strict';

const checkOfferExist = (data, offerId) => data.some(({id}) => id === offerId);

const getExistedOffer = (data, offerId) => data.find(({id}) => id === offerId);

const getExistedOfferId = (data, offerId) => data.findIndex(({id}) => id === offerId);

module.exports = {
  checkOfferExist,
  getExistedOffer,
  getExistedOfferId,
};
