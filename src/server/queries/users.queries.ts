import { and, asc, count, desc, eq, gte, ilike, lte } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { TRPCError } from "@trpc/server";
import { deleteFile } from "../storage/delete-file";
import type { GetUsersSchema } from "@/schema/user.schema";
import { filterColumns } from "@/lib/filter-column";

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

  async getAllUser(input: GetUsersSchema) {
    try {
      const offset = (input.page - 1) * input.perPage;
      const advancedTable = input.filters && input.filters.length > 0;

      const where = advancedTable
        ? filterColumns({
            table: users,
            filters: input.filters,
            joinOperator: "and",
          })
        : and(
            input.name ? ilike(users.name, `%${input.name}%`) : undefined,
            input.username
              ? ilike(users.username, `%${input.username}%`)
              : undefined,
            input.createdAt.length > 0
              ? and(
                  input.createdAt[0]
                    ? gte(
                        users.createdAt,
                        (() => {
                          const date = new Date(input.createdAt[0]);
                          date.setHours(0, 0, 0, 0);
                          return date;
                        })(),
                      )
                    : undefined,
                  input.createdAt[1]
                    ? lte(
                        users.createdAt,
                        (() => {
                          const date = new Date(input.createdAt[1]);
                          date.setHours(23, 59, 59, 999);
                          return date;
                        })(),
                      )
                    : undefined,
                )
              : undefined,
          );

      const orderBy =
        input.sort.length > 0
          ? input.sort.map((item) =>
              item.desc ? desc(users[item.id]) : asc(users[item.id]),
            )
          : [asc(users.createdAt)];

      const { data, total } = await db.transaction(async (tx) => {
        const data = await tx
          .select()
          .from(users)
          .limit(input.perPage)
          .offset(offset)
          .where(where)
          .orderBy(...orderBy);

        const total = await tx
          .select({
            count: count(),
          })
          .from(users)
          .where(where)
          .execute()
          .then((res) => res[0]?.count ?? 0);

        return {
          data,
          total,
        };
      });

      const pageCount = Math.ceil(total / input.perPage);
      return { data, pageCount };
    } catch {
      return { data: [], pageCount: 0 };
    }
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
