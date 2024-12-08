import { useEffect, useState } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form.tsx';
import { Textarea } from '../ui/textarea.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card.tsx';
import { SubmitButton } from '../Forms/SubmitButton';
import { ReloadIcon } from '@radix-ui/react-icons';
import { getServiceAvailability, generateImage } from '../../services/clarify.service.ts';

const formSchema = z.object({
  requestField: z.string().min(6, {
    message: 'Text must have at least 6 symbols',
  }),
});

export interface FormInput {
  requestField: string;
}

const ImageGenerator = () => {
  const form = useForm({
    resolver: zodResolver(formSchema), // Apply zod resolver with schema
    defaultValues: {
      requestField: '',
    },
  });
  const [disabled, setDisabled] = useState(false);
  const [requested, setRequested] = useState(false);
  const [alt, setAlt] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  const handleSubmit = async ({ requestField }: FormInput) => {
    try {
      setRequested(true);
      const imageUrl = await generateImage(requestField);

      if (imageUrl) {
        setImageBase64(imageUrl);
        setAlt(requestField);
      }
      setRequested(false);
    } catch (err) {
      console.log('err', err);
      setRequested(false);
      setImageBase64('');
      // setError('Invalid credentials');
    }
  };

  useEffect(() => {
    getServiceAvailability().then(({ available }) => {
      setDisabled(!available);
    });
  }, []);

  return (<div>
    <div className={'flex justify-center flex-col items-center text-center'}>
      <h4 className={'text-xl'}>{
        disabled ? 'Contact with admin, service is unavailable' : 'Please, describe what image do you want to generate!'
      }</h4>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 min-w-[300px]">
          <FormField
            control={form.control}
            name="requestField"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Type your request!</FormLabel>
                <FormControl>
                  <Textarea
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Request Field"
                    disabled={disabled}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500">Enter your request to generate
                  image</FormDescription>
                <FormMessage className="text-red-500 text-sm mt-1" />
              </FormItem>
            )}
          />

          <SubmitButton requested={requested} text={'Submit'} disabled={disabled} />
        </form>
      </Form>

      {
        <Card className="mt-4 w-full shadow-lg">
          {
            (
              <CardHeader>
                {
                  imageBase64 ? (
                      <img src={`data:image/jpeg;base64,${imageBase64}`}
                           alt={'generated image'}
                           className="w-full h-48 object-cover rounded-t-md"
                      />
                    ) :
                    !requested ?
                      disabled ? 'Contact with admin, service is unavailable' : <p>Waiting for your request!</p>
                      : <p>Loading...</p>
                }

              </CardHeader>
            )
          }

          <CardContent>
            {
              (
                <>
                  <CardTitle className="text-lg font-semibold pt-2">{!requested ?
                    <span>Please, type your request and submit!</span> :
                    <div className={'flex justify-center'}>
                      <ReloadIcon className="mr-2 h-7 w-7 animate-spin" />
                    </div>
                  }</CardTitle>
                  <CardDescription className="text-sm text-gray-500">{alt}</CardDescription>
                </>
              )
            }
          </CardContent>
        </Card>
      }
    </div>
  </div>);
};

export default ImageGenerator;