import { useState } from 'react';

// ── components
import { MarketVolume } from './MarketVolume';
import { PriceChart } from './PriceChart';
import { IIndexController, IndexController } from './IndexController';

// ── types
import type { FC } from 'react';

// ── constants
const INDEXES: Readonly<IIndexController[]> = [
  {
    key: 'high',
    title: 'Higher',
    color: 'success',
    checked: true,
  },
  {
    key: 'open',
    title: 'Average',
    color: 'warning',
    checked: true,
  },
  {
    key: 'low',
    title: 'Lower',
    color: 'danger',
    checked: true,
  },
] as const;

//          ╭─────────────────────────────────────────────────────────╮
//          │                        component                        │
//          ╰─────────────────────────────────────────────────────────╯
export const CryptoChart: FC = () => {
  const [indexes, setIndexes] = useState<IIndexController[]>([...INDEXES]);

  const handleIndexChange = (item: IIndexController) => {
    setIndexes((prev) => {
      return prev.map((prevItem) => {
        if (prevItem.key === item.key) {
          return item;
        }

        return prevItem;
      });
    });
  };

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
        <IndexController indexes={indexes} handleIndexChange={handleIndexChange} />

        <div className='w-full p-8'>2</div>
        <div className='w-full p-8'>3</div>
      </div>
    </div>
  );
};
