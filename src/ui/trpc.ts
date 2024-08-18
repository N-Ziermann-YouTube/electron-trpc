import type { appRouter } from '../electron/trpc';
import { createTRPCProxyClient, httpLink } from '@trpc/client';

export const trpcClient = createTRPCProxyClient<typeof appRouter>({
  links: [
    httpLink({
      url: '',
      fetch: async (path) => {
        if (typeof path !== 'string') {
          throw new Error('Unexpected input format');
        }
        const mockUrl = new URL('http://dummy' + path);
        const procedureName = mockUrl.pathname.replace('/', '');
        const jsonInput = mockUrl.searchParams.get('input');

        const data = await window.electron.sendTrpcEvent({
          procedureName,
          data: jsonInput ?? 'null',
        });

        return new Response(JSON.stringify({ result: { type: 'data', data } }));
      },
    }),
  ],
});
