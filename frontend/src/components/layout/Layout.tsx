import Header from "../header/Header";
import Navbar from "../navbar/Navbar";

const LightEffect = () => {
    return (
        <div className="w-bodyWidth h-screen flex items-center justify-center fixed top-0 pointer-events-none">
            <div className="w-full h-full flex items-center justify-center absolute top-0 opacity-80">
                <div className="absolute left-0 -translate-x-1/2 w-70 h-70 bg-red-500 rounded-full blur-[120px] animate-[pulse_4s_ease-in-out_infinite]"></div>
                <div className="absolute right-0 translate-x-1/2 w-70 h-70 bg-blue-500 rounded-full blur-[120px] animate-[pulse_4s_ease-in-out_2s_infinite]"></div>
            </div>
            <h1 className="absolute w-full text-center text-[1000%] uppercase font-bold bg-gradient-to-b from-blue-500  to-red-500 text-transparent bg-clip-text opacity-30 scale-100">
                Keyvalue
            </h1>
        </div>
    );
};

const Layout = ({ title, children }: { title?: string, children?: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen bg-bgColor">
            <Header title={title}/>
            <Navbar />
            <div className="flex mt-headerHeight">
                <div className="w-full h-bodyHeight relative ml-navbarWidth">
                    <LightEffect />
                    <main className="p-6 overflow-y-auto w-full h-full relative z-10">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;