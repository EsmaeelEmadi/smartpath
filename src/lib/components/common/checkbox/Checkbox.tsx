import classNames from 'classnames';

// ── types
import type { FC, InputHTMLAttributes } from 'react';
import { TColor } from '../../../util/types/theme';

interface ICheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  color?: TColor;
}

export const Checkbox: FC<ICheckboxProps> = ({ className, color = 'success', ...rest }) => {
  return (
    <input
      type='checkbox'
      className={classNames(
        'appearance-none bg-transparent border-2 rounded-full w-4 h-4 transition-all duration-100 outline-none cursor-pointer',
        {
          'accent-custom-green-500 border-custom-green-500 checked:bg-custom-green-500':
            color === 'success',
          'accent-custom-golden-500 border-custom-golden-500 checked:bg-custom-golden-500':
            color === 'warning',
          'accent-custom-red-500 border-custom-red-500 checked:bg-custom-red-500':
            color === 'danger',
        },
        className,
      )}
      {...rest}
    />
  );
};
