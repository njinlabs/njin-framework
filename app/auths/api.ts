import { HandlerContext } from "#types/handler_context";
import { AuthOption } from "#utils/auth";
import { createId } from "@paralleldrive/cuid2";
import argon2 from "argon2";
import { Express } from "express";

type Option = {
  name?: string;
  id: number;
};

export type ApiAuth = {
  id: number;
  hashed: string;
  name: string | null;
  userId: number;
  bearerToken?: string;
};

const apiOption = (app: Express): AuthOption<Option, ApiAuth> => {
  return {
    providerName: "api",
    generator: async (option) => {
      const { prisma } = app.get("context") as HandlerContext;
      const user = await prisma.user.findFirst({
        where: {
          id: option.id,
        },
      });

      if (!user) throw new Error("User not found");

      const token = createId();
      const userToken = await prisma.userToken.create({
        data: {
          userId: user.id,
          name: "",
          hashed: await argon2.hash(token),
        },
      });

      return {
        ...userToken,
        name: userToken.name || "",
        bearerToken: `${userToken.id}|${token}`,
      };
    },
    validator: async (token) => {
      if (token.split("|").length < 2) {
        return false;
      }

      const [id, raw] = token.split("|");
      const { prisma } = app.get("context") as HandlerContext;

      const userToken = await prisma.userToken.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!userToken) return false;

      return await argon2.verify(userToken.hashed, raw);
    },
  };
};

export default apiOption;
