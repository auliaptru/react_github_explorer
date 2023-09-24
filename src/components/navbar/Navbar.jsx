import './navbar.scss';

const Navbar = () => {
    return (
        <nav>
            <button>
                <img
                    src='https://cdn-icons-png.flaticon.com/512/565/565504.png'
                    alt='explorer-logo'
                />
                <a href='/'>Github Repositories Explorer</a>
            </button>
            <div></div>
        </nav>
    );
};

export default Navbar;
