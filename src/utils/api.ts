import { TApiConstructorType } from '../services/types';

const URL_API: 'https://norma.nomoreparties.space/api' = 'https://norma.nomoreparties.space/api';
const INGREDIENTS: '/ingredients' = '/ingredients';
const ORDERS: '/orders' = '/orders';
const RESET_PASSWORD: '/password-reset' = '/password-reset';
const SET_NEW_PASSWORD: '/password-reset/reset' = '/password-reset/reset';
const REGISTER_USER: '/auth/register' = '/auth/register';
const LOGIN: '/auth/login' = '/auth/login';
const RESET_REFRESH_TOKEN: '/auth/token' = '/auth/token';
const LOGOUT: '/auth/logout' = '/auth/logout';
const USER: '/auth/user' = '/auth/user';

class Api {
  _baseUrl: string;

  _ingredientsEndPoint: string;

  _ordersEndPoint: string;

  _resetPasswordEndPoint: string;

  _setNewPasswordEndPoint: string;

  _registerUserEndPoint: string;

  _loginEndPoint: string;

  _resetRefreshTokenEndPoint: string;

  _logoutEndPoint: string;

  _userEndPoint: string;

  _headers: { 'Content-Type': string; };

  constructor({
    baseUrl,
    ingredientsEndPoint,
    ordersEndPoint,
    resetPasswordEndPoint,
    setNewPasswordEndPoint,
    registerUserEndPoint,
    loginEndPoint,
    resetRefreshTokenEndPoint,
    logoutEndPoint,
    userEndPoint,
  }: TApiConstructorType) {
    this._baseUrl = baseUrl;
    this._ingredientsEndPoint = ingredientsEndPoint;
    this._ordersEndPoint = ordersEndPoint;
    this._resetPasswordEndPoint = resetPasswordEndPoint;
    this._setNewPasswordEndPoint = setNewPasswordEndPoint;
    this._registerUserEndPoint = registerUserEndPoint;
    this._loginEndPoint = loginEndPoint;
    this._resetRefreshTokenEndPoint = resetRefreshTokenEndPoint;
    this._logoutEndPoint = logoutEndPoint;
    this._userEndPoint = userEndPoint;
    this._headers = {
      'Content-Type': 'application/json',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  _getResponseData(res: Response) {
    if (!res.ok) {
      return Promise.reject(res);
    }
    return res.json();
  }

  getIngredients() {
    return fetch(`${this._baseUrl}${this._ingredientsEndPoint}`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._getResponseData);
  }

  sendOrder(ingredients: Array<string>) {
    return fetch(`${this._baseUrl}${this._ordersEndPoint}`, {
      method: 'POST',
      headers: {
        ...this._headers,
        authorization: `${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({
        ingredients,
      }),
    })
      .then(this._getResponseData);
  }

  resetPassword(email: string) {
    return fetch(`${this._baseUrl}${this._resetPasswordEndPoint}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
      }),
    })
      .then(this._getResponseData);
  }

  setNewPassword(password: string, token: string) {
    return fetch(`${this._baseUrl}${this._setNewPasswordEndPoint}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then(this._getResponseData);
  }

  registerUser(email: string, password: string, name: string) {
    return fetch(`${this._baseUrl}${this._registerUserEndPoint}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then(this._getResponseData);
  }

  login(email: string, password: string) {
    return fetch(`${this._baseUrl}${this._loginEndPoint}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(this._getResponseData);
  }

  resetRefreshToken() {
    return fetch(`${this._baseUrl}${this._resetRefreshTokenEndPoint}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        token: `${localStorage.getItem('refreshToken')}`,
      }),
    })
      .then(this._getResponseData);
  }

  logout() {
    return fetch(`${this._baseUrl}${this._logoutEndPoint}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        token: `${localStorage.getItem('refreshToken')}`,
      }),
    })
      .then(this._getResponseData);
  }

  getUser() {
    return fetch(`${this._baseUrl}${this._userEndPoint}`, {
      method: 'GET',
      headers: { ...this._headers, authorization: `${localStorage.getItem('accessToken')}` },
    })
      .then(this._getResponseData);
  }

  updateUser(name:string, email:string, password:string) {
    return fetch(`${this._baseUrl}${this._userEndPoint}`, {
      method: 'PATCH',
      headers: { ...this._headers, authorization: `${localStorage.getItem('accessToken')}` },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then(this._getResponseData);
  }
}

export default new Api({
  baseUrl: URL_API,
  ingredientsEndPoint: INGREDIENTS,
  ordersEndPoint: ORDERS,
  resetPasswordEndPoint: RESET_PASSWORD,
  setNewPasswordEndPoint: SET_NEW_PASSWORD,
  registerUserEndPoint: REGISTER_USER,
  loginEndPoint: LOGIN,
  resetRefreshTokenEndPoint: RESET_REFRESH_TOKEN,
  logoutEndPoint: LOGOUT,
  userEndPoint: USER,
});
