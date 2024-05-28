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
  show?: boolean;
}

//, title
export const Bar: FC<IBarProps> = ({
  min,
  max,
  value,
  show = true,
  size = 'md',
  color = 'bg-gray-300',
}) => {
  const [isHover, setIsHover] = useState(false);

  const height = ((value - min) / (max - min)) * 100;

  const handleHoverStart = () => {
    setIsHover(true);
  };

  const handleHoverEnd = () => {
    setIsHover(false);
  };

  return (
    <motion.div className='h-full flex flex-col-reverse mx-[1px]'>
      {value ? (
        <motion.div
          whileHover={{ scale: 1.05, zIndex: 100, transition: { duration: 0.2 } }}
          exit={{ scale: 1, transition: { duration: 0.2 } }}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          initial={{ height: 0 }}
          animate={show ? 'visible' : 'hidden'}
          variants={{
            //hidden: {
            //  width: 0,
            //  transition: { type: 'tween', ease: 'easeOut', duration: 0.7 },
            //},
            visible: {
              height: `${height}%`,
              transition: { type: 'tween', ease: 'easeIn', duration: 0.7 },
            },
          }}
          style={{ width: BAR_SIZE[size] }}
          className={classNames('relative rounded-md border-none felx text-center', color)}
        >
          <motion.div
            className='absolute -top-6 right-0 left-0 flex justify-center'
            animate={isHover && show ? 'open' : 'closed'}
            variants={{
              open: { opacity: 100, zIndex: 100 },
              closed: { opacity: 0, zIndex: 0 },
            }}
            initial={{ opacity: 0, zIndex: 0 }}
          >
            <motion.div className='bg-gray-600 w-fit p-[2px] px-2 rounded-md'>
              <p className='text-xs text-gray-100'>{value}</p>
            </motion.div>
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
