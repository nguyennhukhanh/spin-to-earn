import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('FireBomberTokenModule', (m) => {
  const token = m.contract('FireBomberToken');

  return { token };
});
