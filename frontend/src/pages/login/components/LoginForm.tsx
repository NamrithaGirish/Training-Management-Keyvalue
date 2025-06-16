import { useState } from "react";
import LoginInput from "./LoginInput";

type SliderPosition = "left" | "right";

const LoginForm = () => {
    const [sliderPosition, setSliderPosition] =
        useState<SliderPosition>("left");

    const toggleSlider = () => {
        sliderPosition == "left"
            ? setSliderPosition("right")
            : setSliderPosition("left");
    };

    const formText = sliderPosition == "left" ? "Welcome text" : "Welcome back";

    return (
        <div className="flex items-center justify-center w-[650px] h-[400px] bg-white rounded-md shadow-md overflow-hidden relative">
            <form
                onSubmit={() => {}}
                className="w-[50%] h-full flex flex-col items-center justify-center gap-8 text-gray-700 px-2"
            >
                <h2 className="text-[40px] font-bold">Sign Up</h2>
                <div className="w-[80%] flex flex-col items-center justify-center gap-5">
                    <LoginInput name="name" placeholder="Name" />
                    <LoginInput name="email" placeholder="Email" />
                    <LoginInput name="password" type="password" placeholder="Password" />
                </div>
                <button
                    type="button"
                    className="border-2 bg-orange-400 text-white px-8 py-1.5 rounded-md uppercase"
                >
                    Signup
                </button>
            </form>

            <form
                onSubmit={() => {}}
                className="w-[50%] h-full flex flex-col items-center justify-center gap-8 text-gray-700 px-2"
            >
                <h2 className="text-[40px] font-bold">Sign In</h2>
                <div className="w-[80%] flex flex-col items-center justify-center gap-5">
                    <LoginInput name="username" placeholder="Username" />
                    <LoginInput name="password" type="password" placeholder="Password"/>
                </div>
                <p className="mt-[-5px] text-sm">Forget Password?</p>
                <button
                    type="button"
                    className="border-2 bg-orange-400 text-white px-8 py-1.5 rounded-md uppercase"
                >
                    Signin
                </button>
            </form>

            <div
                className={`w-[50%] h-full flex flex-col items-center justify-center absolute left-0 bg-orange-400 gap-10 duration-400 text-white rounded-${
                    sliderPosition == "left" ? "r" : "l"
                }-2xl ${sliderPosition == "right" && "translate-x-[100%]"}`}
            >
                <h3 className="text-4xl">Logo</h3>
                <p className="">{formText}</p>
                <button
                    className="border-2 px-8 py-1.5 rounded uppercase"
                    onClick={toggleSlider}
                >
                    Signup
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
