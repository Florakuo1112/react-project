import {NavLink, Outlet} from 'react-router';

function FrontPagesLayout(){
    return(
        <>

        <div className="container">
        <nav>
            <NavLink to='./Login'>Admin Login</NavLink>
            <h2>前台</h2>
        </nav>
        <Outlet></Outlet>
        </div>
        </>
    )
};

export default FrontPagesLayout;