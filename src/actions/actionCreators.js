'use strict'

import * as types from './actionTypes'

export const placeholder = () => ({
  type: types.PLACEHOLDER,
  payload: {},
  meta: {}
})


/**
 * GAME PLAN
 * =========
 *
 * - an initial login view collects username and password information
 * - entering a login sends an attempt_login action
 * - action sends the password information to a /login request on the backend
 * - if the request is successful, add auth token to state and local storage
 * - if the request fails, add an error to the state
 * - an isAuthenticated function checks if the auth token is in the state or
 *   local storage and attaches it to all api requests
 * - the isAuthenticated function is applied as middleware to api calls
 */
