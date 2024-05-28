import { useState, useEffect } from 'react';
import { useGet } from '../../../../util/API/hooks';

// ── components
import { Chart } from '../../chart/Chart';
import { Bar } from '../../chart/Bar';
import { Checkbox } from '../../checkbox/Checkbox';

// ── types
import type { FC } from 'react';
import type { TChartLevel } from '../../chart/Chart';
import type {
  IHourlyExchangeVolume,
  IHourlyExchangeVolumeResponse,
} from '../../../../util/types/market';

interface IMarketVolumeProps {
  dates?: Date[];
}

// ── constants
const LEVELS: TChartLevel = [
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
];

const CACHE_CONFIG = { address: 'smartpath-volume', revalidationTime: 60 * 60 * 1000 };

//          ╭─────────────────────────────────────────────────────────╮
//          │                       components                        │
//          ╰─────────────────────────────────────────────────────────╯
export const MarketVolume: FC<IMarketVolumeProps> = () => {
  // ── states
  const [selectedVolume, setSelectedVolume] = useState<IHourlyExchangeVolume>();
  const [highestVolume, setHighestVolume] = useState<number>();
  //const [sortedData, setSortedData] = useState<IMarketVolume[]>();

  //, error, onHold,
  const { data, fetch } = useGet<IHourlyExchangeVolumeResponse>({
    url: 'https://min-api.cryptocompare.com/data/exchange/histohour',
    withCache: true,
    cacheConfig: CACHE_CONFIG,
  });

  useEffect(() => {
    fetch({ params: { tsym: 'BTC', limit: '10' } });
  }, []);

  useEffect(() => {
    if (data) {
      setSelectedVolume(data.Data[0]);

      const sortedByVolume = [...data.Data].sort((a, b) => b.volume - a.volume);
      setHighestVolume(sortedByVolume[0].volume);
    }
  }, [data]);

  // ── handlers
  const handleVolumeChange = (volume: IHourlyExchangeVolume) => {
    setSelectedVolume(volume);
  };

  // ── renderer

  const selectedVolumeHour = selectedVolume
    ? new Date(selectedVolume.time * 1000).getHours()
    : null;

  return (
    <div className='h-full flex flex-col gap-2'>
      <div className='text-center'>
        <h4 className='text-lg font-bold'>{`Market Value of ${selectedVolumeHour}`}</h4>
      </div>
      <div className='w-full h-full pb-4 flex gap-4 flex-col'>
        <Chart levels={LEVELS}>
          {selectedVolume ? (
            <Bar
              min={0}
              max={highestVolume ?? 0}
              value={selectedVolume?.volume}
              size='lg'
              color='bg-custom-green-400'
            />
          ) : null}
        </Chart>
        <div className='flex justify-center gap-2'>
          {data?.Data
            ? data.Data.map((item, index) => {
                return (
                  <Checkbox
                    key={index}
                    checked={item.time === selectedVolume?.time}
                    onChange={() => handleVolumeChange(item)}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};
