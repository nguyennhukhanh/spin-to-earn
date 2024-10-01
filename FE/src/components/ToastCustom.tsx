import { type ExternalToast, toast } from 'sonner';

import { Icons } from '@/assets/icons';

const ToastCustom = {
  success: (
    message = '',
    icon = <Icons.toastSuccess width={30} height={30} />,
    duration = 4000,
    props?: ExternalToast
  ) => {
    return toast(message, {
      ...props,
      icon,
      duration,
      classNames: {
        toast: 'border-[#62C669] bg-[#F0FFEB]',
      },
    });
  },
  error: (message = '', icon = <Icons.toastError width={30} height={30} />, duration = 4000, props?: ExternalToast) => {
    return toast(message, {
      ...props,
      icon,
      duration,
      classNames: {
        toast: 'border-[#EA4745] bg-[#FFF3F3]',
      },
    });
  },
  warning: (
    message = '',
    icon = <Icons.toastWarning width={30} height={30} />,
    duration = 4000,
    props?: ExternalToast
  ) => {
    return toast(message, {
      ...props,
      icon,
      duration,
      classNames: {
        toast: 'border-[#FFC007] bg-[#FFFCF3]',
      },
    });
  },
};

export default ToastCustom;
