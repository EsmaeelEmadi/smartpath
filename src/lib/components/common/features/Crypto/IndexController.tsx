import { motion } from 'framer-motion';

// ── components
import { Checkbox } from '../../checkbox/Checkbox';

// ── types
import type { FC } from 'react';
import type { TColor } from '../../../../util/types/theme';

export interface IIndexController {
  key: string;
  title: string;
  checked: boolean;
  color: TColor;
}

interface IIndexControllerProps {
  indexes: IIndexController[];
  handleIndexChange(item: IIndexController): void;
}

//          ╭─────────────────────────────────────────────────────────╮
//          │                        component                        │
//          ╰─────────────────────────────────────────────────────────╯
export const IndexController: FC<IIndexControllerProps> = ({ indexes, handleIndexChange }) => {
  return (
    <div className='w-full p-8'>
      <div>
        <p className='text-lg font-bold'>Indexes</p>
      </div>
      <div className='flex items-center justify-center w-full h-full'>
        <div className='flex flex-col gap-8'>
          {indexes.map((item, index) => {
            console.log({ item });
            return (
              <motion.label
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                key={index}
                className='flex gap-6 items-center select-none outline-none'
              >
                <Checkbox
                  color={item.color}
                  checked={item.checked}
                  onChange={(e) => handleIndexChange({ ...item, checked: e.target.checked })}
                />
                <p className='font-bold'>{item.title}</p>
              </motion.label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
