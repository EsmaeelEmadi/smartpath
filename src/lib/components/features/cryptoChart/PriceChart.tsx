import { useState, useEffect } from 'react';
import { useGet } from '../../../util/API/hooks';

// ── components
import { Chart } from '../../common/chart/Chart';
import { BarGroup } from '../../common/chart/BarGroup';
import { Bar } from '../../common/chart/Bar';

// ── types
import type { FC } from 'react';
import type { IChartLevel } from '../../common/chart/Chart';
import type { IHourlyPairOHLCVResponse } from '../../../util/types/market';
import type { IIndexController } from './IndexController';
import type { IMinMax } from '../../../util/types/general';
import type { IHighLowMinMax } from './types';

interface IPriceChartProps {
  indexes: IIndexController[];
  onMinMaxChange(minMax: IHighLowMinMax): void;
}

// ── constants
const LEVELS: Readonly<IChartLevel[]> = [
  {
    name: 'level 1',
    placementPercent: 25,
  },
  {
    name: 'level 2',
    placementPercent: 50,
  },
  {
    name: 'level 3',
    placementPercent: 75,
  },
  {
    placementPercent: 100,
  },
] as const;

const CACHE_CONFIG = { address: 'smartpath-ohlcv', revalidationTime: 60 * 60 * 1000 };

//          ╭─────────────────────────────────────────────────────────╮
//          │                       components                        │
//          ╰─────────────────────────────────────────────────────────╯
export const PriceChart: FC<IPriceChartProps> = ({ indexes, onMinMaxChange }) => {
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
        // TODO: move to .env
        api_key: '365694a330b56587f1e2a5b53a1d24c68ecbfbb1dadfee33c5848e299c896ae8',
      },
    });
  }, []);

  useEffect(() => {
    if (data) {
      const clone = [...data.Data.Data];
      let _min = clone.sort((a, b) => b.high - a.high)[0].high;
      const _max = clone.sort((a, b) => a.low - b.low)[0].low;

      /**
       * lower the mininum value of the char
       * otherwise the lowes element won't be visible
       */
      const amountToReduceMin = (_max - _min) / 10;
      _min = _min - amountToReduceMin;

      setMinMax({ min: _min, max: _max });

      /**
       * handle low and high minMax
       */
      const cloneZeroHours = new Date(clone[0].time * 1000).getHours();

      const minMax = clone.reduce(
        (acc, curr) => {
          if (acc.low.min.value > curr.low) {
            acc.low.min.value = curr.low;
            acc.low.min.time = new Date(curr.time * 1000).getHours();
          } else if (acc.low.max.value < curr.low) {
            acc.low.max.value = curr.low;
            acc.low.max.time = new Date(curr.time * 1000).getHours();
          }

          if (acc.high.min.value > curr.high) {
            acc.high.min.value = curr.high;
            acc.high.min.time = new Date(curr.time * 1000).getHours();
          } else if (acc.high.max.value < curr.high) {
            acc.high.max.value = curr.high;
            acc.high.max.time = new Date(curr.time * 1000).getHours();
          }

          return acc;
        },
        {
          low: {
            min: { time: cloneZeroHours, value: clone[0].low },
            max: { time: cloneZeroHours, value: clone[0].low },
          },
          high: {
            min: { time: cloneZeroHours, value: clone[0].high },
            max: { time: cloneZeroHours, value: clone[0].high },
          },
        },
      );

      onMinMaxChange({
        low: { min: minMax.low.min.time, max: minMax.low.max.time },
        high: { min: minMax.high.min.time, max: minMax.high.max.time },
      });
    }
  }, [data]);

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
                    show={indexes.find((item) => item.key === 'high')?.checked}
                    min={minMax.min}
                    max={minMax.max}
                    size='sm'
                    value={item.high}
                    color='bg-custom-green-500'
                  />

                  <Bar
                    show={indexes.find((item) => item.key === 'open')?.checked}
                    min={minMax.min}
                    max={minMax.max}
                    size='sm'
                    value={item.open}
                    color='bg-custom-golden-500'
                  />

                  <Bar
                    show={indexes.find((item) => item.key === 'low')?.checked}
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
