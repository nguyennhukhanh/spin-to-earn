import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { ConnectItem } from './ConnectItem';

const mockConnector = {
  id: 'metaMask',
  uid: 'metaMask',
  name: 'MetaMask',
  getProvider: jest.fn(() => Promise.resolve({})),
} as any;

const originalWindowOpen = window.open;
const mockWindowOpen = jest.fn();
window.open = mockWindowOpen;

describe('ConnectItem', () => {
  afterEach(() => {
    mockWindowOpen.mockReset();
    jest.resetAllMocks();
  });

  afterAll(() => {
    window.open = originalWindowOpen;
  });

  test('renders the component with correct content', async () => {
    render(<ConnectItem connector={mockConnector} onClick={jest.fn()} loading={false} disabled={false} />);

    await waitFor(() => {
      const walletName = screen.getByText('MetaMask');
      expect(walletName).toBeInTheDocument();
    });
  });

  test('opens MetaMask app link when connector is MetaMask and not ready', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    mockConnector.getProvider.mockResolvedValueOnce(null); // Simulate not ready

    render(<ConnectItem connector={mockConnector} onClick={onClick} loading={false} disabled={false} />);

    const connectButton = screen.getByRole('button');
    await user.click(connectButton);
    expect(window.open).toHaveBeenCalledWith(`https://metamask.app.link/dapp/${window.location.href}`, '_blank');
  });

  test('calls onClick when connector is ready', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    mockConnector.getProvider.mockResolvedValueOnce(true);

    render(<ConnectItem connector={mockConnector} onClick={onClick} loading={false} disabled={false} />);

    const connectButton = screen.getByRole('button');
    await user.click(connectButton);
    expect(onClick).toHaveBeenCalled();
  });

  test('disables the button when disabled prop is true', () => {
    const onClick = jest.fn();

    render(<ConnectItem connector={mockConnector} onClick={onClick} loading={false} disabled={true} />);

    const connectButton = screen.getByRole('button');
    expect(connectButton).toBeDisabled();
  });
});
