import { CreateUser } from "../utils/createData.js";
import { prisma } from "../config/db.js";

export async function create(createUser: CreateUser) {
  const { username, password } = createUser;

  return prisma.user.create({
    data: {
      username,
      password,
      account: {
        create: {
          balance: 100.00
        }
      }
    }
  });
}

export async function findByUsername(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    }
  });
}

export async function createSession(token: string, userId: number) {
  return prisma.session.create({
    data: { token, userId }
  });
}

export async function findById(id: number) {
  return prisma.user.findUnique({
    where: {
      id,
    }
  });
}

export async function endSession(userId: number) {
  return prisma.session.deleteMany({
    where: {
      userId,
    }
  });
}
