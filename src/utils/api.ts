import { TApiConstructorType } from "../services/types";

const URL_API: 'https://norma.nomoreparties.space/api' = 'https://norma.nomoreparties.space/api';
const INGREDIENTS: '/ingredients' = '/ingredients';
const ORDERS: '/orders' = '/orders';

class Api {
  _baseUrl: string;
  _ingredientsEndPoint: string;
  _ordersEndPoint: string;
  _headers: { 'Content-Type': string; };
  constructor({ baseUrl, ingredientsEndPoint, ordersEndPoint }: TApiConstructorType) {
    this._baseUrl = baseUrl;
    this._ingredientsEndPoint = ingredientsEndPoint;
    this._ordersEndPoint = ordersEndPoint;
    this._headers = {
      'Content-Type': 'application/json',
    };
  }

  _getResponseData(res: Response) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
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
      headers: this._headers,
      body: JSON.stringify({
        ingredients,
      })
    })
      .then(this._getResponseData)
  }
}

export default new Api( {
  baseUrl: URL_API,
  ingredientsEndPoint: INGREDIENTS,
  ordersEndPoint: ORDERS,
})