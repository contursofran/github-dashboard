import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

type SessionContext = {
  session?: {
    user?: {
      id?: string;
    };
  } | null;
};

export const requireUserId = (ctx: SessionContext) => {
  const userId = ctx.session?.user?.id;

  if (!userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return userId;
};

const requireOwnedRecord = (record: unknown) => {
  if (!record) {
    throw new TRPCError({ code: "NOT_FOUND" });
  }
};

export const requireRepositoryOwner = async (
  prisma: PrismaClient,
  userId: string,
  repositoryId: string
) => {
  const repository = await prisma.repository.findFirst({
    where: { id: repositoryId, userId },
    select: { id: true },
  });

  requireOwnedRecord(repository);
};

export const requireTaskOwner = async (
  prisma: PrismaClient,
  userId: string,
  taskId: string
) => {
  const task = await prisma.tasks.findFirst({
    where: { id: taskId, repository: { userId } },
    select: { id: true },
  });

  requireOwnedRecord(task);
};

export const requireFeatureOwner = async (
  prisma: PrismaClient,
  userId: string,
  featureId: string
) => {
  const feature = await prisma.features.findFirst({
    where: { id: featureId, repository: { userId } },
    select: { id: true },
  });

  requireOwnedRecord(feature);
};

export const requireIssueOwner = async (
  prisma: PrismaClient,
  userId: string,
  issueId: string
) => {
  const issue = await prisma.issues.findFirst({
    where: { id: issueId, repository: { userId } },
    select: { id: true },
  });

  requireOwnedRecord(issue);
};
