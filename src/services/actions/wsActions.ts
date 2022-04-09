import { WS_CONNECTION_START, WS_CUSTOM_URL_CONNECTION_START, WS_CLOSE_CONNECTION } from '../constants';

export const wsConnectionStart = () => ({
  type: WS_CONNECTION_START,
});

export const wsCustomUrlConnectionStart = (customUrl: string) => ({
  type: WS_CUSTOM_URL_CONNECTION_START,
  payload: customUrl,
});

export const wsClose = () => ({
  type: WS_CLOSE_CONNECTION,
});
