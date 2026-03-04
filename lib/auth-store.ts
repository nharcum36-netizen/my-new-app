import crypto from "crypto";

export type AuthUser = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  englishLevel: string;
  plan: string;
  createdAt: string;
};

type AuthStore = Map<string, AuthUser>;

declare global {
  // eslint-disable-next-line no-var
  var __ceaAuthStore: AuthStore | undefined;
}

function getStore(): AuthStore {
  if (!global.__ceaAuthStore) {
    const store = new Map<string, AuthUser>();
    store.set("demo@example.com", {
      id: "demo-user",
      email: "demo@example.com",
      passwordHash: hashPassword("demo1234"),
      name: "Demo User",
      englishLevel: "beginner",
      plan: "starter",
      createdAt: new Date().toISOString(),
    });
    global.__ceaAuthStore = store;
  }

  return global.__ceaAuthStore;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function generateToken(email: string): string {
  return crypto
    .createHash("sha256")
    .update(email + Date.now() + Math.random())
    .digest("hex");
}

export function getUserByEmail(email: string): AuthUser | undefined {
  return getStore().get(normalizeEmail(email));
}

export function createUser(input: {
  email: string;
  password: string;
  name: string;
  englishLevel?: string;
}): AuthUser {
  const email = normalizeEmail(input.email);
  const user: AuthUser = {
    id: crypto.randomUUID(),
    email,
    passwordHash: hashPassword(input.password),
    name: input.name,
    englishLevel: input.englishLevel || "beginner",
    plan: "free",
    createdAt: new Date().toISOString(),
  };

  getStore().set(email, user);
  return user;
}
