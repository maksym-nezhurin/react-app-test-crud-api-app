import { useState } from 'react';
import { OneTimePassword } from '../../Forms/OneTimePassword.tsx';
import ApiService from '../../../utils/apiService.tsx';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SubmitButton } from '../../Forms/SubmitButton';
import { soonerNotify } from '../../../utils/notify.ts';

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = `${apiUrl}/api/users/2fa`;
const formSchema = z.object({
  code: z
    .string()
    .min(5, { message: "Please enter a valid 6 symbols code." }),
});

interface IProps {
  onSuccess: () => void
}
const TwoFactorAuth = (props: IProps) => {
  const apiService = new ApiService({
    baseURL: API_URL,
    multipartFormData: false,
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: ""
    },
  });
  const [requested, setRequested] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const setup2FA =async () => {
    const { data } = await apiService.get<{ qrCode: string; secret:string }>('/setup', {});
    setQrCode(data.qrCode);
    setSecret(data.secret);
  };

  const handleSubmit = async ({ code }: { code: string }) => {
    try {
      setRequested(true)
      const { data } = await apiService.post<{ message: string, success: boolean }>('/verify', { token: code, secret });

      soonerNotify(data.message, data.success ? 'success' : 'error')
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setRequested(false)
      props.onSuccess();
    }
  };

  return (
    <div>
      <button onClick={setup2FA}>Setup 2FA</button>
      {qrCode && <img src={qrCode} alt="QR Code" />}

      {qrCode && <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 min-w-[300px] flex flex-col justify-between"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className={"relative"}>
                <FormLabel className="flex text-sm font-medium text-gray-700">
                  One time code
                </FormLabel>
                <FormControl>
                  <OneTimePassword {...field} />
                </FormControl>
                <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0 w-full overflow-hidden text-nowrap text-ellipsis" />
              </FormItem>
            )}
          />
          <SubmitButton requested={requested} />
        </form>
      </Form>}
    </div>
  );
};

export default TwoFactorAuth;
