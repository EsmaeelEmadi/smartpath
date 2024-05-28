// ── components
import classNames from 'classnames';
import { motion } from 'framer-motion';

// ── types
import type { FC, PropsWithChildren } from 'react';
import { IBarProps } from './Bar';
//Bar,
interface IChartLavel {
  name?: string;
  placementPercent: number;
}

export type TChartLevel = IChartLavel[];
export type TChartAlign = 'center' | 'start' | 'end';

export interface IChartBar extends Omit<IBarProps, 'min' | 'max' | 'size'> {
  title: string;
}
export interface IChartBarGroup {
  bars: Omit<IBarProps, 'min' | 'max' | 'size'>[];
  title: string;
}

//bars: IChartBar[] | IChartBarGroup[];
//Omit<IBarProps, 'value'>

interface IChartSX {
  barWrapper?: {
    className?: string;
  };
}

export interface IChartProps extends PropsWithChildren {
  levels?: TChartLevel;
  align?: TChartAlign;
  sx?: IChartSX;
}

//          ╭─────────────────────────────────────────────────────────╮
//          │                        component                        │
//          ╰─────────────────────────────────────────────────────────╯
export const Chart: FC<IChartProps> = ({ levels, sx, align = 'center', children }) => {
  return (
    <div className='flex flex-row h-full'>
      {levels ? (
        <div className='w-[100px] relative'>
          {levels.map((level) => {
            if (!level.name) return null;

            return (
              <motion.div
                initial={{ opacity: 0, bottom: `${level.placementPercent}%` }}
                animate={{ opacity: 100 }}
                transition={{
                  ease: 'easeOut',
                  delay: 0.2,
                  duration: 0.3,
                }}
                className='absolute'
              >
                <p className=''>{level.name}</p>
              </motion.div>
            );
          })}
        </div>
      ) : null}
      <div
        className={classNames('flex relative w-full overflow-auto', sx?.barWrapper?.className, {
          'justify-center': align === 'center',
          'justify-start': align === 'start',
          'justify-end': align === 'end',
        })}
      >
        {children}
        {levels
          ? levels.map((level) => {
              return (
                <motion.div
                  initial={{ bottom: `${level.placementPercent}%`, left: 0 }}
                  animate={{ right: 0 }}
                  transition={{
                    ease: 'easeOut',
                    delay: 0.2,
                    duration: 0.3,
                  }}
                  className='absolute'
                >
                  <div className='border-b-gray-100 border border-dashed' />
                </motion.div>
              );
            })
          : null}
      </div>
    </div>
  );
};
//{bars.map((bar) => {
//  return null;
//  //if (bar.title) {
//  //return <Bar min={min} max={max} value={bar.value} size={size} color={bar.color} />;
//  //}
//})}
