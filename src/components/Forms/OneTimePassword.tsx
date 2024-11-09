import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "../ui/input-otp.tsx";
import * as React from "react";

const OneTimePassword = React.forwardRef<HTMLInputElement>((props, ref) => {
    return (<InputOTP ref={ref} maxLength={6} {...props}>
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
            </InputOTPGroup>
        </InputOTP>
    )
});

OneTimePassword.displayName = "OneTimePassword";

export { OneTimePassword };