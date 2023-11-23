import { redirect } from "next/navigation";
import { getPageSession } from "./lucia";

type AuthSession = {
  session: {
    user: {
      id: string;
      email: string;
      name: string;
    };
  } | null;
};

export const getUserAuth = async (): Promise<AuthSession> => {
  const session = await getPageSession();
  if (!session) {
    return {
      session: null,
    };
  }
  return {
    session: {
      user: {
        id: session.id,
        email: session.email,
        name: session.name,
      },
    },
  };
};

export const checkUserAuth = async () => {
  const session = await getPageSession();
  if (!session) redirect("/auth");
};
