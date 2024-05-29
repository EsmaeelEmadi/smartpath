import { useCallback, useState } from 'react';

// ── components
import { MarketVolume } from './MarketVolume';
import { PriceChart } from './PriceChart';
import { IIndexController, IndexController } from './IndexController';
import { MinMax } from './MinMax';

// ── types
import type { FC } from 'react';
import type { IHighLowMinMax } from './types';

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
  const [minMax, setMinMax] = useState<IHighLowMinMax>();

  const handleMinMaxChange = useCallback(
    (minMax: IHighLowMinMax) => {
      setMinMax(minMax);
    },
    [setMinMax],
  );

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
    <div className='flex flex-col w-full lg:m-12 md:m-8 m-2 gap-4 p-4 rounded-xl bg-[#f5f6f8]'>
      <div className='grid grid-cols-12 w-full gap-4'>
        <div className='lg:col-span-8 col-span-12 min-h-96 rounded-xl bg-white p-4 shadow-md shadow-gray-200'>
          <PriceChart indexes={indexes} onMinMaxChange={handleMinMaxChange} />
        </div>
        <div className='lg:col-span-4 col-span-12 min-h-96 rounded-xl bg-white p-4 shadow-md shadow-gray-200'>
          <MarketVolume />
        </div>
      </div>
      <div className='grid grid-cols-12 bg-white p-4 shadow-md shadow-gray-200 rounded-xl h-fit'>
        <div className='lg:col-span-4 col-span-12'>
          <IndexController indexes={indexes} handleIndexChange={handleIndexChange} />
        </div>
        <div className='lg:col-span-4 sm:col-span-6 col-span-12'>
          <MinMax
            title='Maximum range:'
            min={minMax?.low.min}
            max={minMax?.low.max}
            textColor='text-custom-red-500'
          />
        </div>
        <div className='lg:col-span-4 sm:col-span-6 col-span-12'>
          <MinMax
            title='Minimum range:'
            min={minMax?.high.min}
            max={minMax?.high.max}
            textColor='text-custom-green-500'
          />
        </div>
      </div>
    </div>
  );
};
