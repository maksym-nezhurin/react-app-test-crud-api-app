import React from 'react';
import Login from "../components/Login";

import { Button } from "../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs"
import Register from "../components/Register";

const AuthPage: React.FC = () => {
    return <div className={'h-full contents'}>
        <h3 className={'my-4'}>Please, select necessary flow!</h3>

        <Tabs defaultValue="register" className="w-[400px] flex self-center flex-col">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Enter your data to login into account!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Login />
                    </CardContent>
                    <CardFooter>
                        <p className="text-sm text-gray-400 self-center">
                            Thank you for using out service!
                        </p>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="register">
                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            Register new Account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Register />
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
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>

        <div className="footer">
            <p>Privacy reserved!</p>
        </div>
    </div>
}

export default AuthPage;