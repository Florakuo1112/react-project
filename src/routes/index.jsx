import AdminPagesLayout from "../views/adminPages/AdminPagesLayout";
import AdminProductsView from '../views/adminPages/AdminProductsView'

import FrontPagesLayout from "../views/frontPages/FrontPagesLayout";
import HomeView from "../views/frontPages/HomeView";
import LoginView from "../views/frontPages/LoginView";
import CartView from "../views/frontPages/CartView";
import ProductsListView from "../views/frontPages/ProductsListView";
import ProductView from "../views/frontPages/ProductView";
import NotFoundView from "../views/frontPages/NotFoundView"


const routes = [
    {
        path : '/admin',
        element : <AdminPagesLayout/>,
        children:[
            {
                path : 'products',
                element : <AdminProductsView/>
            }
        ]
    },
    {
        path : '/',
        element : <FrontPagesLayout/>,
        children:[
            {
                path : 'login',
                element : <LoginView/>
            },
            {
                path : '',
                element : <HomeView/>
            },
            {
                path : 'cart',
                element : <CartView/>
            },
            {
                path : 'productlist',
                element : <ProductsListView/>
            },
            {
                path : ':productlist/:id',
                element: <ProductView />
            },
            {
                path : '*',
                element: <NotFoundView />
            }
        ]
    }
];

export default routes;