// ── components
import { Checkbox } from '../../checkbox/Checkbox';

// ── types
import type { FC } from 'react';

//          ╭─────────────────────────────────────────────────────────╮
//          │                        component                        │
//          ╰─────────────────────────────────────────────────────────╯
export const IndexController: FC = () => {
  return (
    <div className='w-full p-8'>
      <div>
        <p className='text-lg font-bold'>Indexes</p>
      </div>
      <div className='flex items-center justify-center w-full h-full'>
        <div className='flex flex-col gap-8'>
          <label className='flex gap-6 items-center'>
            <Checkbox color='success' />
            <p className='font-bold'>Higher</p>
          </label>
          <label className='flex gap-6 items-center'>
            <Checkbox color='warning' />
            <p className='font-bold'>Average</p>
          </label>
          <label className='flex gap-6 items-center'>
            <Checkbox color='danger' />
            <p className='font-bold'>Lower</p>
          </label>
        </div>
      </div>
    </div>
  );
};
