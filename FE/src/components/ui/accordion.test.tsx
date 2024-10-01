import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import React from 'react';

import { Accordion, AccordionItem, AccordionTrigger } from './accordion';

test('renders AccordionItem correctly', () => {
  const { getByText } = render(
    <Accordion type="single">
      <AccordionItem value="1">
        <AccordionTrigger>Accordion Item 1</AccordionTrigger>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>Accordion Item 2</AccordionTrigger>
      </AccordionItem>
    </Accordion>
  );

  expect(getByText('Accordion Item 1')).toBeInTheDocument();
  expect(getByText('Accordion Item 2')).toBeInTheDocument();
});
