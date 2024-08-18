import { initTRPC } from '@trpc/server';
import { ipcMain } from 'electron';

const t = initTRPC.create();
const publicProcedure = t.procedure;

export const appRouter = t.router({
  double: publicProcedure
    .input((arg) => {
      return arg as { value: number };
    })
    .query(({ input }) => ({ double: input.value * 2 })),
  test: publicProcedure.mutation(() => 12),
});

const createCaller = t.createCallerFactory(appRouter);
const caller = createCaller({});

export function registerTrpcIpcListener() {
  ipcMain.handle('trpc', (_, payload: TrpcEvent) => {
    return (caller[payload.procedureName as keyof typeof caller] as Function)?.(
      JSON.parse(payload.data)
    );
  });
}
