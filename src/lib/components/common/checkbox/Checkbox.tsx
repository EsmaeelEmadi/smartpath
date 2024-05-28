// ── types
import type { FC } from 'react';

export const Checkbox: FC = () => {
  return (
    <input
      type='checkbox'
      className='appearance-none bg-transparent accent-custom-green-500 border-custom-green-400 border-2 rounded-full w-4 h-4 checked:bg-green-400 transition-all duration-100 outline-none cursor-pointer'
    />
  );
};
