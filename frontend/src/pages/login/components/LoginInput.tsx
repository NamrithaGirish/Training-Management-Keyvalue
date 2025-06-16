import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

interface LoginInputProps {
    name: string;
    placeholder?: string;
    type?: string;
    id?: string;
    className?: string;
    required?: boolean;
}

const LoginInput = (props: LoginInputProps) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const inputType =
        props.type != "password"
            ? props.type
            : passwordVisible
            ? "text"
            : "password";
    return (
        <div
            className={`flex flex-col gap-4 w-full relative ${props.className}`}
        >
            <input
                type={inputType || "text"}
                name={props.name}
                id={props.id || props.name}
                required={props.required || false}
                placeholder={props.placeholder || ""}
                className={`p-2 border border-black text-black rounded outline-0`}
            />
            {props.type == "password" && (
                <div className="absolute right-5 flex items-center justify-center h-full">
                    {passwordVisible ? (
                        <IoMdEyeOff
                            className="absolute text-2xl"
                            onClick={() => setPasswordVisible(false)}
                        />
                    ) : (
                        <IoMdEye
                            className="absolute text-2xl"
                            onClick={() => setPasswordVisible(true)}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default LoginInput;
