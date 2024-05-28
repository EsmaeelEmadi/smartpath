// ── types
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

export interface IBarGroupProps extends PropsWithChildren {
  title?: string;
  className?: string;
}

export const BarGroup: FC<IBarGroupProps> = ({ title, children, className }) => {
  return (
    <div className={classNames('h-full flex flex-col', className)}>
      <div className='flex flex-row h-full'>{children}</div>
      <div className='py-2 text-center'>{title}</div>
    </div>
  );
};
