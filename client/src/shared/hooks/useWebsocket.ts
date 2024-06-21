import { Socket, io } from 'socket.io-client';

class WebSocketSingleton {
  private static instance: Socket | null = null;

  private constructor() {}

  public static getInstance(): Socket {
    if (!WebSocketSingleton.instance) {
      const url = process.env.NEXT_PUBLIC_SERVER || 'http://localhost:5000';
      const token = typeof window !== 'undefined' && localStorage.getItem('jwt');
      WebSocketSingleton.instance = io(url, { query: { token } });

      WebSocketSingleton.instance.on('connect', () => console.log('websocket id ' + WebSocketSingleton.instance!.id));
      WebSocketSingleton.instance.on('disconnect', () => console.log('websocket disconnect'));
    }

    return WebSocketSingleton.instance;
  }
}

export default WebSocketSingleton;
