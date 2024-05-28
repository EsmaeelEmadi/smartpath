import { useState, useEffect } from 'react';

// ── components
import { MarketValue } from './MarketValue';
import { PriceChart } from './PriceChart';

// ── types
import type { FC } from 'react';

//          ╭─────────────────────────────────────────────────────────╮
//          │                        component                        │
//          ╰─────────────────────────────────────────────────────────╯

export const CryptoChart: FC = () => {
  const [dates, setDates] = useState<Date[]>();

  useEffect(() => {
    const newDates: Date[] = [];
    const today = new Date();
    newDates.push(today);
    /**
     * count days down to create an array for the last 10 days
     */
    for (let i = 1; i < 10; i++) {
      const newDate = new Date(today);
      newDate.setDate(newDate.getDate() - i);
      newDates.push(newDate);
    }

    console.log(newDates);

    setDates(newDates);
  }, []);

  return (
    <div className='grid grid-rows-2 w-full m-12 gap-4 p-4 rounded-xl bg-[#f5f6f8]'>
      <div className='grid grid-cols-12 w-full gap-4'>
        <div className='col-span-8 rounded-xl bg-white p-4 shadow-md shadow-gray-200'>
          <PriceChart />
        </div>
        <div className='col-span-4 rounded-xl bg-white p-4 min-h-96 shadow-md shadow-gray-200'>
          <MarketValue dates={dates} />
        </div>
      </div>
      <div className='bg-white p-4 shadow-md shadow-gray-200 rounded-xl flex'>
        <div className='w-full p-8'>
          <div>
            <p className='text-lg font-bold'>Indexes</p>
          </div>
          <div className='flex items-center justify-center w-full h-full'>
            <div className='flex flex-col gap-8'>
              <div className='flex gap-6 items-center'>
                <div className='h-4 w-4 rounded-full bg-custom-green-400' />
                <p className='font-bold'>Higher</p>
              </div>
              <div className='flex gap-6 items-center'>
                <div className='h-4 w-4 rounded-full bg-custom-golden-400' />
                <p className='font-bold'>Average</p>
              </div>
              <div className='flex gap-6 items-center'>
                <div className='h-4 w-4 rounded-full bg-custom-red-400' />
                <p className='font-bold'>Lower</p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full p-8'>2</div>
        <div className='w-full p-8'>3</div>
      </div>
    </div>
  );
};
