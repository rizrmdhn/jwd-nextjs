import { createTRPCRouter, protectedProcedure } from "../trpc";
import usersQueries from "@/server/queries/users.queries";
import userSchema from "@/schema/user.schema";
import {
  MAXIMUM_FILE_SIZE,
  MAXIMUM_FILE_SIZE_REACH_MESSAGE,
} from "@/lib/constants";

import { v7 as uuidv7 } from "uuid";
import { writeFileToDisk } from "@/server/storage/write-file-to-disk";

export const userRouter = createTRPCRouter({
  updateFotoProfile: protectedProcedure
    .input(userSchema.updateUserFotoSchema)
    .mutation(async ({ input: { foto, userId } }) => {
      if (foto.size > MAXIMUM_FILE_SIZE) {
        throw new Error(MAXIMUM_FILE_SIZE_REACH_MESSAGE);
      }

      const uploadedFile = await writeFileToDisk(
        "avatars",
        foto,
        foto.type,
        `avatars-${uuidv7()}`,
      );

      const updatedProfile = await usersQueries.updateFotoProfileByUserId(
        userId,
        uploadedFile.name,
        uploadedFile.url,
      );

      return updatedProfile;
    }),
});
