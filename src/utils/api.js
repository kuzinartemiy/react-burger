const URL_API = 'https://norma.nomoreparties.space/api';
const INGREDIENTS = '/ingredients';
const ORDERS = '/orders';

class Api {
  constructor({ baseUrl, ingredientsEndPoint, ordersEndPoint }) {
    this._baseUrl = baseUrl;
    this._ingredientsEndPoint = ingredientsEndPoint;
    this._ordersEndPoint = ordersEndPoint;
    this._headers = {
      'Content-Type': 'application/json',
    };
  }

  _getResponseData(res) {
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

  sendOrder(ingredients) {
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