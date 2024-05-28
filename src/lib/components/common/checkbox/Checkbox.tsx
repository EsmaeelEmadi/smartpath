import classNames from 'classnames';

// ── types
import type { FC, InputHTMLAttributes } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ICheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const Checkbox: FC<ICheckboxProps> = ({ className, ...rest }) => {
  return (
    <input
      type='checkbox'
      className={classNames(
        'appearance-none bg-transparent accent-custom-green-500 border-custom-green-400 border-2 rounded-full w-4 h-4 checked:bg-green-400 transition-all duration-100 outline-none cursor-pointer',
        className,
      )}
      {...rest}
    />
  );
};
