import AdminPagesLayout from "../views/adminPages/AdminPagesLayout";
import AdminProductsView from '../views/adminPages/AdminProductsView'

import FrontPagesLayout from "../views/frontPages/FrontPagesLayout";
import HomeView from "../views/frontPages/HomeView";
import LoginView from "../views/frontPages/LoginView";
import CartView from "../views/frontPages/CartView";
import ProductsListView from "../views/frontPages/ProductsListView";
import ProductView from "../views/frontPages/ProductView";


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
            },
            {
                path : 'Cart',
                element : <CartView/>
            },
            {
                path : 'ProductList',
                element : <ProductsListView/>
            },
            {
                path : ':ProductList/:id',
                element: <ProductView />
            }
        ]
    }
];

export default routes;