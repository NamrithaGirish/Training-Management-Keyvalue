const NavbarItem = ({
    label = "label",
    icon = "icon",
}: {
    label?: string;
    icon?: string;
}) => {
    return (
        <li>
            <a
                href="#"
                className="flex justify-between items-center w-9/10 border-2 border-borderColor border-l-transparent bg-cardColor rounded-r-full p-4 pr-6"
            >
                <p className="text-white text-lg">{label}</p>
                <span className="text-white text-lg">{icon}</span>
            </a>
        </li>
    );
};

const Navbar = () => {
    return (
        <nav
            className={`fixed top-headerHeight -translate-x-2px left-0 bottom-0 w-navbarWidth h-full bg-cardColor text-white shadow-lg py-8 z-40 border-2 border-borderColor`}
        >
            <ul className="space-y-4">
                <NavbarItem label="Dashboard" icon="🏠" />
                <NavbarItem label="Dashboard" icon="🏠" />
            </ul>
        </nav>
    );
};

export default Navbar;