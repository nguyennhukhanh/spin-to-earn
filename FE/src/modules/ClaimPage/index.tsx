import React from 'react';

import { ShadowContainer } from '@/components/ShadowContainer';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ClaimPage = () => {
  return (
    <div className="container min-h-screen space-y-6 bg-muted py-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Claim Your Rewards</h1>
        <p className="text-muted-foreground">
          {
            "To claim your rewards, simply enter your wallet address and the amount you'd like to claim. Once you submit the form, your rewards will be transferred to your wallet."
          }
        </p>
      </div>

      <ShadowContainer className="space-y-6">
        <p className="text-2xl font-semibold">History</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Play At</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Prize</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2023-04-15</TableCell>
              <TableCell>10</TableCell>
              <TableCell className="text-right">100 BTC</TableCell>
              <TableCell className="text-right">10 BTC</TableCell>
              <TableCell className="text-center">
                <Button size="sm">Claim</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ShadowContainer>
    </div>
  );
};

export default ClaimPage;
