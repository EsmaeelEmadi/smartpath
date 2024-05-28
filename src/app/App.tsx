// COMPONENTS
import { CryptoChart } from '../lib/components/features/cryptoChart/CryptoChart';

// TYPES
import { FC } from 'react';

export const App: FC = () => {
  return (
    <div className='App bg-[#d7e5e3] w-full min-h-screen flex items-center justify-center'>
      <CryptoChart />
    </div>
  );
};
