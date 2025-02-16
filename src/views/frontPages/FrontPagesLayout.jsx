import {NavLink, Outlet} from 'react-router';

function FrontPagesLayout(){
    return(
        <>

        <div className="container">
        <nav>
            <NavLink to='./Login'>Admin Login</NavLink> | 
            <NavLink to='./'>Home</NavLink> |
            <NavLink to='./ProductList'>Product List</NavLink> |
            <NavLink to='./Cart'>Cart</NavLink> |
            <h2>前台</h2>
        </nav>
        <Outlet></Outlet>
        </div>
        </>
    )
};

export default FrontPagesLayout;