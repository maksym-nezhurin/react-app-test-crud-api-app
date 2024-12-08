import { ButtonLoading } from '../../LoadingButton';
import { Button } from '../../ui/button.tsx';

interface IProps {
  requested: boolean,
  disabled?: boolean,
  text?: string,
  type?: TType,
  onSubmit?: (data: never) => void
}

type TType = 'submit' | 'reset' | 'button' | undefined;

export const SubmitButton = (props: IProps) => {
  const { requested = false, text = 'Submit', type = 'submit', onSubmit, ...rest } = props;

  return requested ?
    <ButtonLoading /> :
    <Button type={type}
            onSubmit={onSubmit}
            className="w-full text-white rounded-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            {...rest}
    >
      {text}
    </Button>;
};