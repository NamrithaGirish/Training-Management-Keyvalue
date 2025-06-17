import { useState, type ChangeEvent } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

interface LoginInputProps {
    name: string;
    value: string;
    placeholder?: string;
    type?: string;
    id?: string;
    className?: string;
    required?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const LoginInput: React.FC<LoginInputProps> = ({
    name,
    value,
    placeholder,
    type="text",
    id,
    className,
    required=false,
    onChange,
}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const inputType =
        type != "password"
            ? type
            : passwordVisible
            ? "text"
            : "password";
    return (
        <div
            className={`flex flex-col gap-4 w-full relative ${className}`}
        >
            <input
                type={inputType}
                name={name}
                value={value}
                id={id || name}
                required={required}
                placeholder={placeholder || ""}
                onChange={onChange}
                className={`p-2 border border-gray-300 text-white rounded outline-0`}
            />
            {type == "password" && (
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
