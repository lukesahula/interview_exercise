import type { DefaultSession } from "next-auth";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    user?: {
      id?: string;
    };
  }

  interface User extends DefaultUser {
    accessToken?: string;
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id?: string;
  }
}
