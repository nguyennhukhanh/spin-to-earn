import { z } from 'zod';

export const buyTicketSchema = z.object({
  quantity: z.number().refine((value) => {
    return String(value) !== '' || value > 0;
  }, 'Quantity is required'),
});

export type BuyTicketSchemaType = z.infer<typeof buyTicketSchema>;
