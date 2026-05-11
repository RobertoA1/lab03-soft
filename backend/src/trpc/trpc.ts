import { initTRPC } from '@trpc/server';
import { verify } from 'jsonwebtoken';
import type { Request } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'agrotech-jwt-secret-dev';

export interface TrpcContext {
  req?: Request;
}

const t = initTRPC.context<TrpcContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const authedProcedure = t.procedure.use(async (opts) => {
  const { ctx } = opts;
  const token = ctx.req?.headers?.authorization?.replace('Bearer ', '');
  if (!token) throw new Error('No autorizado');
  try {
    const decoded = verify(token, JWT_SECRET) as any;
    return opts.next({ ctx: { ...ctx, user: decoded } });
  } catch {
    throw new Error('Token inválido');
  }
});

export const adminProcedure = authedProcedure.use(async (opts) => {
  const user = (opts.ctx as any).user;
  if (user?.role !== 'admin') throw new Error('Solo administradores');
  return opts.next({ ctx: opts.ctx });
});
