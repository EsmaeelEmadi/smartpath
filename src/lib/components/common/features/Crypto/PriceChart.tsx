import { useState, useEffect } from 'react';
import { useGet } from '../../../../util/API/hooks';

// ── components
import { Chart } from '../../chart/Chart';
import { BarGroup } from '../../chart/BarGroup';
import { Bar } from '../../chart/Bar';

// ── types
import type { FC } from 'react';
import type { TChartLevel } from '../../chart/Chart';
import type { IHourlyPairOHLCV, IHourlyPairOHLCVResponse } from '../../../../util/types/market';

interface IMinMax {
  min: number;
  max: number;
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
  {
    placementPercent: 100,
  },
];

// ── constants
const CACHE_CONFIG = { address: 'smartpath-ohlcv', revalidationTime: 60 * 60 * 1000 };

//          ╭─────────────────────────────────────────────────────────╮
//          │                       components                        │
//          ╰─────────────────────────────────────────────────────────╯
export const PriceChart: FC = () => {
  const [minMax, setMinMax] = useState<IMinMax>();

  const { data, fetch } = useGet<IHourlyPairOHLCVResponse>({
    url: 'https://min-api.cryptocompare.com/data/v2/histohour',
    withCache: true,
    cacheConfig: CACHE_CONFIG,
  });

  useEffect(() => {
    fetch({
      params: {
        fsym: 'BTC',
        tsym: 'USD',
        limit: '10',
        api_key: '365694a330b56587f1e2a5b53a1d24c68ecbfbb1dadfee33c5848e299c896ae8',
      },
    });
  }, []);

  useEffect(() => {
    console.log('----', data?.Data);
    if (data) {
      //setSelectedVolume(data.Data[0]);
      const clone = [...data.Data.Data];
      let _min = clone.sort((a, b) => b.high - a.high)[0].high;
      const _max = clone.sort((a, b) => a.low - b.low)[0].low;

      const amountToReduceMin = (_max - _min) / 10;
      _min = _min - amountToReduceMin;

      setMinMax({ min: _min, max: _max });
    }
  }, [data]);

  console.log({ minMax });

  return (
    <div className='h-full flex flex-col gap-2'>
      <Chart levels={LEVELS}>
        {minMax && data
          ? data.Data.Data.map((item, index) => {
              return (
                <BarGroup
                  key={index}
                  className='mx-1'
                  title={String(new Date(item.time * 1000).getHours())}
                >
                  <Bar
                    min={minMax.min}
                    max={minMax.max}
                    size='sm'
                    value={item.high}
                    color='bg-custom-green-500'
                  />
                  <Bar
                    min={minMax.min}
                    max={minMax.max}
                    size='sm'
                    value={item.open}
                    color='bg-custom-golden-500'
                  />
                  <Bar
                    min={minMax.min}
                    max={minMax.max}
                    size='sm'
                    value={item.low}
                    color='bg-custom-red-500'
                  />
                </BarGroup>
              );
            })
          : null}
      </Chart>
    </div>
  );
};
