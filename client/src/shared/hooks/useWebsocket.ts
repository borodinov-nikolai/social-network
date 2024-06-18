import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";


const useWebSocket = () => {
  const [socket, setSocket] = useState<Socket>();
  const url = process.env.NEXT_PUBLIC_SERVER
  const token = localStorage.getItem('jwt')


  
  useEffect(() => {
    const newSocket = io('http://localhost:5000', {query: {token}});
    newSocket.on('connect', ()=> console.log( 'websocket id ' + newSocket.id))
    newSocket.on('disconnect', ()=> console.log('websocket disconect'))
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  
  return socket;
};

export default useWebSocket;
