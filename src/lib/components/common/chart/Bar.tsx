import classNames from 'classnames';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';

const BAR_SIZE = {
  sm: 10,
  md: 20,
  lg: 30,
} as const;

//const COLORS = {
//  green: 'bg-custom-green-400',
//  red: 'bg-custom-red-400',
//  golden: 'bg-custom-golden-400',
//} as const;

export type TBarSize = keyof typeof BAR_SIZE;
//export type TBarColor = keyof typeof COLORS;

export interface IBarProps {
  min: number;
  max: number;
  value: number;
  size?: TBarSize;
  color?: string;
}

export const Bar: FC<IBarProps> = ({ min, max, value, size = 'md', color = 'bg-gray-300' }) => {
  const [isHover, setIsHover] = useState(false);

  const height = (value / max - min) * 100;

  const handleHoverStart = () => {
    setIsHover(true);
  };

  const handleHoverEnd = () => {
    setIsHover(false);
  };

  return (
    <motion.div animate={isHover ? 'open' : 'closed'} className='h-full flex flex-col-reverse mx-1'>
      {value ? (
        <motion.div
          whileHover={{
            marginBottom: 5,
          }}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          animate={{ height: `${height}%` }}
          transition={{ type: 'spring', stiffness: 100, ease: 'spring', duration: 0.5 }}
          style={{ width: BAR_SIZE[size] }}
          className={classNames('rounded-md z-10 border-none felx text-center', color)}
        >
          <motion.div
            className='w-full mt-1'
            variants={{
              open: { opacity: 100 },
              closed: { opacity: 0 },
            }}
            initial={{ opacity: 0 }}
          >
            <p className='text-xs'>{value}</p>
          </motion.div>
        </motion.div>
      ) : (
        <div
          style={{ width: BAR_SIZE[size] }}
          className='bg-gray-300 rounded-md z-10 border-none felx text-center h-0'
        />
      )}
    </motion.div>
  );
};
