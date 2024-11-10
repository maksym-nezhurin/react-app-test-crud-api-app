import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ResetPassword from "../components/Auth/ResetPassword";
import {motion} from 'framer-motion';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs"

const AuthPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'register');

    // Update the active tab state and query parameter when a tab is clicked
    const handleTabChange = (value: string) => {
        setActiveTab(value);
        setSearchParams({tab: value});
    };

    // Sync activeTab state with the query parameter when it changes
    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam && ['login', 'register', 'password'].includes(tabParam)) {
            setActiveTab(tabParam);
        } else {
            setSearchParams({tab: 'register'});
        }
    }, [searchParams]);

    return (
        <div className="h-full contents">
            <motion.div animate={{ x: [0, 100, 0] }}>
                <h3 className="my-4">Please, select necessary flow!</h3>
            </motion.div>
            <motion.div animate={{ x: [-100, 500, 200] }}>
                <Tabs value={activeTab} onValueChange={handleTabChange}
                      className="w-[400px] flex self-center flex-col">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <Card>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>Enter your data to login into account!</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Login/>
                            </CardContent>
                            <CardFooter>
                                <p className="text-sm text-gray-400 self-center">
                                    Thank you for using our service!
                                </p>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="register">
                        <Card>
                            <CardHeader>
                                <CardTitle>Register</CardTitle>
                                <CardDescription>Register new Account</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Register/>
                            </CardContent>
                            <CardFooter>
                                <p className="text-sm text-gray-400 self-center">
                                    Thank you for registration!
                                </p>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Reset Password</CardTitle>
                                <CardDescription>Change your password here.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <ResetPassword/>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
            <motion.div animate={{x: 0}}>
                <div className="footer p-6">
                    <p>Privacy reserved!</p>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;
