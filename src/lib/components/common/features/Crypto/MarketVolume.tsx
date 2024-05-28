import { useEffect } from 'react';
import { useGet } from '../../../../util/API/hooks';

// ── components
import { Chart } from '../../chart/Chart';
import { Bar } from '../../chart/Bar';

// ── types
import type { FC } from 'react';
import type { TChartLevel } from '../../chart/Chart';

interface IMarketVolumeProps {
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

// ── constants
const CACHE_CONFIG = { address: 'smartpath-volume', revalidationTime: 60 * 60 * 1000 };

//          ╭─────────────────────────────────────────────────────────╮
//          │                       components                        │
//          ╰─────────────────────────────────────────────────────────╯
export const MarketVolume: FC<IMarketVolumeProps> = () => {
  const { data, error, onHold, fetch } = useGet({
    url: 'https://min-api.cryptocompare.com/data/exchange/histohour',
    withCache: true,
    cacheConfig: CACHE_CONFIG,
  });

  useEffect(() => {
    fetch({ params: { tsym: 'BTC', limit: '10' } });
  }, []);

  useEffect(() => {
    console.log({ data, error, onHold });
  }, [data, error, onHold]);

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
          {/*
             
          {dates
            ? dates.map((_, index) => {
                return <Checkbox key={index} />;
              })
            : null}
              */}
        </div>
      </div>
    </div>
  );
};
