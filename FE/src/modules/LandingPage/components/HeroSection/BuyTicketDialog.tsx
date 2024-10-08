import { zodResolver } from '@hookform/resolvers/zod';
import MotionNumber from 'motion-number';
import React, { useMemo } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FormWrapper } from '@/components/ui/form';
import { NumberField } from '@/components/ui/FormField/NumberField';
import { HStack } from '@/components/ui/Utilities';
import { useGetTicketPrice } from '@/hooks/useGetTicketPrice';
import { prettyNumber } from '@/lib/calc';

import { buyTicketSchema, type BuyTicketSchemaType } from '../../schema';

const BuyTicketDialog = () => {
  const { ticketPrice } = useGetTicketPrice();

  const form = useForm<BuyTicketSchemaType>({
    resolver: zodResolver(buyTicketSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const [quantity] = form.watch(['quantity']);

  const total = useMemo(() => ticketPrice * quantity, [quantity, ticketPrice]);

  const handleSubmit: SubmitHandler<BuyTicketSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white text-black hover:bg-gray-700/50 hover:text-white active:scale-90" variant="outline">
          Buy Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy Tickets</DialogTitle>
          <DialogDescription>{"Select the number of tickets you'd like to purchase."}</DialogDescription>
        </DialogHeader>
        <FormWrapper form={form} onSubmit={handleSubmit} className="space-y-4">
          <NumberField size="sm" control={form.control} name="quantity" label="Quantity" />
          <div className="grid gap-1">
            <div className="flex items-center justify-between">
              <span>Price per Ticket</span>
              <span className="font-semibold">{prettyNumber(ticketPrice)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total Price</span>
              <span className="text-2xl font-bold">
                <MotionNumber value={total} format={{ notation: 'compact' }} locales="en-US" />
              </span>
            </div>
          </div>

          <HStack pos="right">
            <Button type="submit">Purchase</Button>
            <DialogClose>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </HStack>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default BuyTicketDialog;
