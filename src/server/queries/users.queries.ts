import { and, asc, count, desc, eq, gte, ilike, lte } from "drizzle-orm";
import { db, type DBType } from "../db";
import { users } from "../db/schema";
import { TRPCError } from "@trpc/server";
import type { z } from "zod";
import { deleteFile } from "../storage/delete-file";

const usersQueries = {
  async getUserById(id: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    return user;
  },

  async getUserByUsername(username: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    return user;
  },

  async updateFotoProfileByUserId(
    userId: string,
    foto: string,
    fotoUrl: string,
  ) {
    const isExist = await this.getUserById(userId);

    if (!isExist) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User tidak ditemukan",
      });
    }

    // check if has foto profile before
    if (isExist.foto) {
      // Delete the old foto
      await deleteFile("avatars", isExist.foto);
    }

    const [updatedProfile] = await db
      .update(users)
      .set({ foto, fotoUrl })
      .where(eq(users.id, userId))
      .returning();

    if (!updatedProfile) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Gagal memperbarui foto profile",
      });
    }

    return updatedProfile;
  },
};

export default usersQueries;
