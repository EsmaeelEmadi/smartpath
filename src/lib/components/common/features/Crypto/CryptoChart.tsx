// ── components
import { MarketVolume } from './MarketVolume';
import { PriceChart } from './PriceChart';
import { IndexController } from './IndexController';

// ── types
import type { FC } from 'react';

//interface selected

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
          <MarketVolume />
        </div>
      </div>
      <div className='bg-white p-4 shadow-md shadow-gray-200 rounded-xl flex'>
        <IndexController />

        <div className='w-full p-8'>2</div>
        <div className='w-full p-8'>3</div>
      </div>
    </div>
  );
};
