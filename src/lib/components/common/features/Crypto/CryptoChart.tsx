// ── components
import { MarketValue } from './MarketValue';

// ── types
import { FC } from 'react';
import { PriceChart } from './PriceChart';

//          ╭─────────────────────────────────────────────────────────╮
//          │                        component                        │
//          ╰─────────────────────────────────────────────────────────╯

export const CryptoChart: FC = () => {
  return (
    <div className='grid grid-rows-2 w-full m-12 gap-4 p-4 rounded-xl bg-[#f5f6f8]'>
      <div className='grid grid-cols-12 w-full gap-4'>
        <div className='col-span-8 rounded-xl bg-white p-4 shadow-md shadow-gray-200'>
          <PriceChart />
        </div>
        <div className='col-span-4 rounded-xl bg-white p-4 min-h-96 shadow-md shadow-gray-200'>
          <MarketValue />
        </div>
      </div>
      <div className='bg-white p-4 shadow-md shadow-gray-200 rounded-xl'>col 2</div>
    </div>
  );
};
