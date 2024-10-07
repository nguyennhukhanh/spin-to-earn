import { Icons } from '@/assets/icons';
import { cn } from '@/lib/utils';

export const Spinner = ({
  className,
  size = '1rem',
  color = '#000',
}: {
  className?: string;
  size?: string;
  color?: string;
}) => {
  return <Icons.spinner size={size} className={cn('animate-spin ', className)} color={color} />;
};
