import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { verify } from "@node-rs/argon2";
import { TRPCError } from "@trpc/server";
import { createTokenCookie, deleteTokenCookie } from "@/server/auth/utils";
import usersQueries from "@/server/queries/users.queries";
import sessionsQueries from "@/server/queries/sessions.queries";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input: { username, password } }) => {
      const user = await usersQueries.getUserByUsername(username);

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Kredensial tidak valid",
        });
      }

      // verify password
      const verifyPasswordResult = await verify(user.password, password);

      if (!verifyPasswordResult) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Kredensial tidak valid",
        });
      }

      const { sessions, user: users } = await sessionsQueries.createSessions(
        user.id,
      );

      void createTokenCookie(sessions.id, new Date(sessions.expiresAt));

      return {
        user: users,
        session: sessions,
      };
    }),

  logout: protectedProcedure.mutation(async ({ ctx: { session } }) => {
    await sessionsQueries.invalidateSessions(session.id);

    void deleteTokenCookie();

    return true;
  }),

  me: publicProcedure.query(async ({ ctx: { user } }) => {
    return user;
  }),
});
