import { useEffect } from "react";
import io from "socket.io-client";

const useSocket = (
  apiUrl: string,
  event: string,
  callback: (data: any) => void,
) => {
  useEffect(() => {
    const socket = io(apiUrl);
    socket.on(event, callback);

    return () => {
      socket.off(event);
      socket.disconnect();
    };
  }, [apiUrl, event, callback]);
};

export default useSocket;
