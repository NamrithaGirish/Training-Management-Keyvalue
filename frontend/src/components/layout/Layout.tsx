import { PacmanLoader } from "react-spinners";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import { ToastContainer } from "react-toastify";

interface LayoutProps {
    title?: string;
    children?: React.ReactNode;
    endAdornments?: React.ReactNode;
    isLoading?: boolean;
}

const LightEffect = () => {
    return (
        <div className="w-bodyWidth h-screen flex items-center justify-center fixed top-0 pointer-events-none">
            <div className="w-full h-full flex items-center justify-center absolute top-0 opacity-80">
                <div className="absolute left-0 -translate-x-1/2 w-70 h-70 bg-red-500 rounded-full blur-[120px] animate-[pulse_4s_ease-in-out_infinite]"></div>
                <div className="absolute right-0 translate-x-1/2 w-70 h-70 bg-blue-500 rounded-full blur-[120px] animate-[pulse_4s_ease-in-out_2s_infinite]"></div>
            </div>
            <h1 className="absolute w-full text-center text-[1000%] uppercase font-bold bg-gradient-to-b from-blue-600  to-red-600 text-transparent bg-clip-text opacity-20 scale-100">
                Keyvalue
            </h1>
        </div>
    );
};

const Layout: React.FC<LayoutProps> = ({
    title,
    children,
    endAdornments,
    isLoading,
}) => {
    return (
        <div className="flex flex-col min-h-screen bg-bgColor">
            <ToastContainer />
            <Header title={title} endAdornments={endAdornments} />
            <Navbar />
            <div className="flex mt-headerHeight">
                <div className="w-full h-bodyHeight relative ml-navbarWidth">
                    <LightEffect />
                    <main className="p-6 overflow-y-auto w-full h-full relative z-10">
                        {isLoading ? (
                            <div className="flex items-center justify-center w-full h-full">
                                <PacmanLoader color="#fff" size={30}/>
                            </div>
                        ) : (
                            children
                        )}
                    </main>
                </div>
            </div>
            {/* <Popup isOpen={true} popup={popup} /> */}
        </div>
    );
};

export default Layout;
