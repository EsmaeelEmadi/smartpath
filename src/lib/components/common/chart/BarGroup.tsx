import classNames from 'classnames';

// ── types
import type { FC, PropsWithChildren } from 'react';

export interface IBarGroupProps extends PropsWithChildren {
  title?: string;
  className?: string;
}

//          ╭─────────────────────────────────────────────────────────╮
//          │                        component                        │
//          ╰─────────────────────────────────────────────────────────╯
export const BarGroup: FC<IBarGroupProps> = ({ title, children, className }) => {
  return (
    <div className={classNames('h-full flex flex-col mx-2', className)}>
      <div className='flex flex-row h-full select-none'>{children}</div>
      <div className='py-2 text-center pointer-events-none select-none'>{title}</div>
    </div>
  );
};
