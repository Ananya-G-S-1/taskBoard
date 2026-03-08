import { useEffect, useState } from "react";
import { socket } from "../socket/socket";

export function usePresence() {
  const [users, setUsers] = useState<any>({});

  useEffect(() => {
    socket.on("presence:update", setUsers);
  }, []);

  return users;
}
