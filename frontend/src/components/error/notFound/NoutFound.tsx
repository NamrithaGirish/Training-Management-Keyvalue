const NotFound = () => {
    return (
        <div className="fixed inset-0 w-screen h-screen bg-bgColor flex flex-col items-center justify-center gap-5">
          <h2 className="text-9xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-500 font-bold ">404</h2>
          {/* <p className="text-4xl text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-red-500 font-bold">Page Not Found</p> */}
          <p className="text-4xl text-white font-bold">Page Not Found</p>
        </div>
    );
}

export default NotFound;