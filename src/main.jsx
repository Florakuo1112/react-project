import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'; 
//import App from './App.jsx';
import './assets/all.scss';

import {createHashRouter, RouterProvider} from 'react-router';
import routes from './routes/index.jsx';

const router = createHashRouter(routes)

//entry point
createRoot(document.getElementById('root')).render(

    <RouterProvider router = {router}>
    </RouterProvider>
  

)
