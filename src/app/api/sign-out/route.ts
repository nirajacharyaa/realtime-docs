import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";
import type { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return new Response(null, {
      status: 401,
    });
  }

  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/auth",
    },
  });
};
