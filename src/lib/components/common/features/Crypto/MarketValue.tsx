// ── components
import { Chart } from '../../chart/Chart';
import { Bar } from '../../chart/Bar';
import { Checkbox } from '../../checkbox/Checkbox';

// ── types
import type { FC } from 'react';
import type { TChartLevel } from '../../chart/Chart';

interface IMarketValueProps {
  dates?: Date[];
}

// ── constants
const LEVELS: TChartLevel = [
  {
    name: 'level 1 is so fun',
    placementPercent: 25,
  },
  {
    name: 'level 1',
    placementPercent: 50,
  },
  {
    name: 'level 1',
    placementPercent: 75,
  },
];

//          ╭─────────────────────────────────────────────────────────╮
//          │                       components                        │
//          ╰─────────────────────────────────────────────────────────╯

export const MarketValue: FC<IMarketValueProps> = ({ dates }) => {
  return (
    <div className='h-full flex flex-col gap-2'>
      <div className='text-center'>
        <h4 className='text-lg font-bold'>Market Value of</h4>
      </div>
      <div className='w-full h-full pb-4 flex gap-4 flex-col'>
        <Chart levels={LEVELS}>
          <Bar min={0} max={100} value={65} size='lg' color='bg-custom-green-400' />
        </Chart>
        <div className='flex justify-center gap-2'>
          {dates
            ? dates.map((_, index) => {
                return <Checkbox key={index} />;
              })
            : null}
        </div>
      </div>
    </div>
  );
};
