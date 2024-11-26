// @ts-nocheck
import { Button } from '../components/ui/button.tsx';
import { authStore } from '../stores/authStore.ts';
import TwoFactorAuth from '../components/Auth/2FA';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

const ProfilePage = () => {
  const { profile } = authStore;
  const [config, setConfig] = useState({});
  const [content, setContent] = useState(null);

  const handleClick = (key) => {
    setContent(config[key].component);

    // console.log(config[key].component);
  };

  useEffect(() => {
    console.log(profile);

    // TODO: request to additional data for profile
    // email, name, surname, logo

    setConfig({
      '2fa': {
        value: 'inactive',
        label: 'Two factor authentification',
        component: <TwoFactorAuth onSuccess={() => setConfig(data => ({
          ...data, ['2fa']: {
            ...data['2fa'],
            value: 'active',
          },
        }))} />,
      },
      name: {
        value: profile?.name,
        label: 'Profile name',
        component: <div>Set Profile name</div>,
      },
      surname: {
        value: 'Nezhurin',
        label: 'Profile surname',
        component: <div>Set Profile surname</div>,
      },
      logo: {
        value: '/uploads/logo/logo.png',
        label: 'User logo',
        component: <div />,
      },
    });
  }, []);

  return <div className={'grid h-full grid-rows-[auto_1fr_auto]'}>
    <header
      className={'flex-grow w-full bg-gray-100 rounded-xl p-3 mb-2 flex flex-col items-center justify-center justify-self-center px-8'}>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome {profile?.name} to profile settings page</h1>
        <p className="mb-6">Here, you can create your own configuration!</p>
      </div>
    </header>

    <main>
      <div className="w-full grid items-center grid-rows-[auto_1fr] gap-4">
        <div>Hello {profile?.name}</div>

        <Table>
          <TableCaption>A list of your recent properties.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className={'w-[100px]'}>Identifier:</TableHead>
              <TableHead className={`text-right`}>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              Object.keys(config).map((key) => {
                const { label, value } = config[key];

                return <TableRow>
                  <TableCell className={`w-[100px]`}>{label}</TableCell>
                  <TableCell className={`flex justify-end`}>
                    <Button variant={'outline'}
                            onClick={() => handleClick(key)}
                    >
                      {value.startsWith('/uploads') ?
                        <img className={'w-10 rounded-xl'} src={`${value}`} alt="logo" /> :
                        value
                      }
                    </Button>
                  </TableCell>
                </TableRow>;
              })
            }

          </TableBody>
        </Table>

        <div>{content}</div>
      </div>
    </main>

    <footer className="bg-gray-500 text-white p-4">
      <div className="container mx-auto text-center">
        <p>Copyright © 2023 Your Company</p>
      </div>
    </footer>
  </div>;
};

export default ProfilePage;