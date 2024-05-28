import { useState, useRef, useCallback, MouseEventHandler } from 'react';
import classNames from 'classnames';

// ── components
import { motion } from 'framer-motion';

// ── types
import type { FC, PropsWithChildren, WheelEventHandler } from 'react';
import type { Point } from 'framer-motion';
import type { IBarProps } from './Bar';

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
  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const scrollStartPoint = useRef<Point>();

  const [isDragging, setIsDragging] = useState(false);

  const handleDragScroll = useCallback(
    (e: MouseEvent) => {
      if (!scrollStartPoint.current) {
        throw new Error('scroll start point in undefined');
      }
      if (!chartWrapperRef.current) {
        throw new Error('chartWrapperRef is undefined');
      }

      const left = chartWrapperRef.current.scrollLeft + (e.clientX - scrollStartPoint.current.x);

      scrollStartPoint.current = { x: e.clientX, y: e.clientY };

      chartWrapperRef.current?.scrollTo({ left });
    },
    [chartWrapperRef, scrollStartPoint],
  );

  const handleDragStart: MouseEventHandler<HTMLDivElement> = (e) => {
    scrollStartPoint.current = { x: e.clientX, y: e.clientY };

    setIsDragging(true);
    if (chartWrapperRef.current) {
      chartWrapperRef.current.addEventListener('mousemove', handleDragScroll);
    } else {
      throw new Error('Unable to add event listener to undefined chartWrapperRef');
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (chartWrapperRef.current) {
      chartWrapperRef.current.removeEventListener('mousemove', handleDragScroll);
    } else {
      throw new Error('Unable to remove event listener to undefined chartWrapperRef');
    }
  };

  const handleWheel: WheelEventHandler<HTMLDivElement> = (e) => {
    if (!chartWrapperRef.current) {
      throw new Error('chartWrapperRef should not be undefined');
    }

    const currentLeft = chartWrapperRef.current.scrollLeft;
    if (e.deltaY > 0) {
      chartWrapperRef.current.scrollTo({ left: currentLeft + 15 });
    } else {
      chartWrapperRef.current.scrollTo({ left: currentLeft - 15 });
    }
  };

  return (
    <div className='flex flex-row h-full'>
      {levels ? (
        <div className='w-[100px] relative mb-4 mt-8'>
          {levels.map((level, index) => {
            if (!level.name) return null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, top: `${level.placementPercent}%` }}
                animate={{ opacity: 100 }}
                transition={{
                  ease: 'easeOut',
                  delay: 0.2,
                  duration: 0.3,
                }}
                className='absolute'
              >
                <p className='leading-[0px]'>{level.name}</p>
              </motion.div>
            );
          })}
        </div>
      ) : null}
      <div
        ref={chartWrapperRef}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onWheel={handleWheel}
        className={classNames(
          'flex relative w-full overflow-x-auto overflow-y-hidden pb-4 pt-8',

          sx?.barWrapper?.className,
          {
            'cursor-grab': !isDragging,
            'cursor-grabbing': isDragging,
          },
        )}
      >
        <div
          className={classNames(
            'flex relative w-full',

            sx?.barWrapper?.className,
            {
              'justify-center': align === 'center',
              'justify-start': align === 'start',
              'justify-end': align === 'end',
              'pointer-events-auto': !isDragging,
              'pointer-events-none': isDragging,
            },
          )}
        >
          {children}
          {levels
            ? levels.map((level, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ bottom: `${level.placementPercent}%`, left: 0 }}
                    animate={{ right: 0 }}
                    transition={{
                      ease: 'easeOut',
                      delay: 0.2,
                      duration: 0.3,
                    }}
                    className='absolute '
                  >
                    <div className='border-b-gray-100 border border-dashed' />
                  </motion.div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};
