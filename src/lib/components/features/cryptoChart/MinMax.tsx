import classNames from 'classnames';

// ── types
import type { FC } from 'react';

interface IMinMax {
  title: string;
  min?: number;
  max?: number;
  textColor?: string;
}

//          ╭─────────────────────────────────────────────────────────╮
//          │                        component                        │
//          ╰─────────────────────────────────────────────────────────╯
export const MinMax: FC<IMinMax> = ({ title, min, max, textColor }) => {
  return (
    <div className='w-full h-full p-8'>
      <div className='flex items-center justify-center w-full h-full'>
        <div className='flex flex-col gap-2 text-center'>
          <div>
            <p className={classNames('text-lg font-bold', textColor)}>{title}</p>
          </div>
          <div>
            <p className={classNames('text-lg font-bold', textColor)}>
              {min ? min : '___'} to {max ? max : '___'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
