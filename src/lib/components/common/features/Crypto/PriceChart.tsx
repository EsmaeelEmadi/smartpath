// ── components
import { Chart } from '../../chart/Chart';

// ── types
import type { FC } from 'react';
import type { TChartLevel } from '../../chart/Chart';
import { BarGroup } from '../../chart/BarGroup';
import { Bar } from '../../chart/Bar';

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
  {
    placementPercent: 100,
  },
];

//          ╭─────────────────────────────────────────────────────────╮
//          │                       components                        │
//          ╰─────────────────────────────────────────────────────────╯

export const PriceChart: FC = () => {
  return (
    <div className='h-full flex flex-col gap-2'>
      <div className='text-center'>
        <h4 className='text-lg font-bold'>Market Value of</h4>
      </div>
      <Chart levels={LEVELS}>
        <BarGroup className='mx-2' title='value 1'>
          <Bar min={0} max={100} size='md' value={30} color='bg-custom-green-400' />
          <Bar min={0} max={100} size='md' value={50} color='bg-custom-golden-400' />
          <Bar min={0} max={100} size='md' value={80} color='bg-custom-red-400' />
        </BarGroup>
        <BarGroup className='mx-2' title='value 2'>
          <Bar min={0} max={100} size='md' value={20} color='bg-custom-green-400' />
          <Bar min={0} max={100} size='md' value={30} color='bg-custom-golden-400' />
          <Bar min={0} max={100} size='md' value={90} color='bg-custom-red-400' />
        </BarGroup>

        <BarGroup className='mx-2' title='value 1'>
          <Bar min={0} max={100} size='md' value={30} color='bg-custom-green-400' />
          <Bar min={0} max={100} size='md' value={50} color='bg-custom-golden-400' />
          <Bar min={0} max={100} size='md' value={80} color='bg-custom-red-400' />
        </BarGroup>
        <BarGroup className='mx-2' title='value 2'>
          <Bar min={0} max={100} size='md' value={20} color='bg-custom-green-400' />
          <Bar min={0} max={100} size='md' value={30} color='bg-custom-golden-400' />
          <Bar min={0} max={100} size='md' value={90} color='bg-custom-red-400' />
        </BarGroup>

        <BarGroup className='mx-2' title='value 1'>
          <Bar min={0} max={100} size='md' value={30} color='bg-custom-green-400' />
          <Bar min={0} max={100} size='md' value={50} color='bg-custom-golden-400' />
          <Bar min={0} max={100} size='md' value={80} color='bg-custom-red-400' />
        </BarGroup>
        <BarGroup className='mx-2' title='value 2'>
          <Bar min={0} max={100} size='md' value={20} color='bg-custom-green-400' />
          <Bar min={0} max={100} size='md' value={30} color='bg-custom-golden-400' />
          <Bar min={0} max={100} size='md' value={90} color='bg-custom-red-400' />
        </BarGroup>

        <BarGroup className='mx-2' title='value 1'>
          <Bar min={0} max={100} size='md' value={30} color='bg-custom-green-400' />
          <Bar min={0} max={100} size='md' value={50} color='bg-custom-golden-400' />
          <Bar min={0} max={100} size='md' value={80} color='bg-custom-red-400' />
        </BarGroup>
        <BarGroup className='mx-2' title='value 2'>
          <Bar min={0} max={100} size='md' value={20} color='bg-custom-green-400' />
          <Bar min={0} max={100} size='md' value={30} color='bg-custom-golden-400' />
          <Bar min={0} max={100} size='md' value={90} color='bg-custom-red-400' />
        </BarGroup>
      </Chart>
    </div>
  );
};
