import { MiddlewareAPI } from 'redux';
import { setLoading } from '../actions';
import { SET_WS_ORDERS } from '../constants';

export const socketMiddleware = (wsUrl: string, wsActions: any) => (store: MiddlewareAPI) => {
  let socket: WebSocket | null = null;

  return (next: any) => (action: { type: string; payload: string; }) => {
    const { dispatch } = store;
    const { type, payload } = action;
    const {
      wsInit, onOpen, onClose, wsClose, onError, wsCustomUrlInit,
    } = wsActions;

    if (type === wsCustomUrlInit) {
      socket = new WebSocket(payload);
    }

    if (type === wsInit) {
      dispatch(setLoading(true));
      socket = new WebSocket(wsUrl);
    }

    if (socket) {
      socket.onopen = (event: Event) => {
        dispatch({ type: onOpen, payload: event });
      };

      socket.onerror = (event: Event) => {
        dispatch({ type: onError, payload: event });
      };

      socket.onmessage = (event: MessageEvent) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;
        dispatch({ type: SET_WS_ORDERS, payload: restParsedData });
        dispatch(setLoading(false));
      };

      socket.onclose = (event: Event) => {
        dispatch({ type: onClose, payload: event });
      };

      if (type === wsClose) {
        socket.close();
      }
    }

    next(action);
  };
};
