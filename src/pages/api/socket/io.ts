import { Server } from "http";
import { Socket, Server as NetServer } from "net";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

type NextApiResponseWithIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

export default function ioHandler(
  req: NextApiRequest,
  res: NextApiResponseWithIO
) {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: Server = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
  }
  res.end();
}
