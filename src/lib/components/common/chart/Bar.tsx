import classNames from 'classnames';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';

const BAR_SIZE = {
  sm: 10,
  md: 20,
  lg: 30,
} as const;

export type TBarSize = keyof typeof BAR_SIZE;

export interface IBarProps {
  min: number;
  max: number;
  value: number;
  size?: TBarSize;
  color?: string;
  title?: string;
}

//, title
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
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          exit={{ scale: 1, transition: { duration: 0.2 } }}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          initial={{ height: 0 }}
          animate={{
            height: `${height}%`,
            transition: { type: 'tween', ease: 'easeInOut', duration: 0.7 },
          }}
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
