import type { TestProject } from 'vitest/node';

/** Uses MONGO_TEST_URI when set (CI), otherwise starts a throwaway in-memory MongoDB. */
export default async function setup(project: TestProject) {
  if (process.env.MONGO_TEST_URI) {
    project.provide('mongoUri', process.env.MONGO_TEST_URI);
    return;
  }
  const { MongoMemoryServer } = await import('mongodb-memory-server');
  const server = await MongoMemoryServer.create();
  project.provide('mongoUri', server.getUri('tehnotrade_test'));
  return () => server.stop();
}

declare module 'vitest' {
  export interface ProvidedContext {
    mongoUri: string;
  }
}
