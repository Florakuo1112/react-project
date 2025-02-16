import AdminPagesLayout from "../views/adminPages/AdminPagesLayout";
import AdminProductsView from '../views/adminPages/AdminProductsView'

import FrontPagesLayout from "../views/frontPages/FrontPagesLayout";
import HomeView from "../views/frontPages/HomeView";
import LoginView from "../views/frontPages/LoginView";


const routes = [
    {
        path : '/Admin',
        element : <AdminPagesLayout/>,
        children:[
            {
                path : 'Products',
                element : <AdminProductsView/>
            }
        ]
    },
    {
        path : '/',
        element : <FrontPagesLayout/>,
        children:[
            {
                path : 'Login',
                element : <LoginView/>

            },
            {
                path : '',
                element : <HomeView/>

            }
        ]
    }
];

export default routes;