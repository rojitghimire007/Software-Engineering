'use strict';

/**
 * Handles promise queries
 * @param {Promise} promise_query 
 * @returns {Promise} - promise_query results
 */
const promiseHandler = (promise_query) => {
  return promise_query
    .then((result) => [result, undefined])
    .catch((error) => [undefined, error]);
};

module.exports = { promiseHandler };