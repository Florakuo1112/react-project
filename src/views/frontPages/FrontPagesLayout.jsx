import { useEffect, useRef} from 'react';
import { Outlet, useLocation} from 'react-router';

import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import AddToCartToastComponent from '../../components/AddToCartToastComponent';


function FrontPagesLayout(){
    const headerRef = useRef(null);
    const outletRef = useRef(null);
    const footerRef = useRef(null);
    //其他
    const location = useLocation();
 
    useEffect(() => {
        if(location.pathname == '/login'){
            console.log('fixed')
            footerRef.current.style.position = 'fixed';  // 設置為固定定位
            footerRef.current.style.bottom = '0';         // 設置 bottom 為 0
            footerRef.current.style.width = '100%'; 
        }else{
            console.log('relative')
            footerRef.current.style.position = 'relative';  // 設置為相對定位       // 
            footerRef.current.style.width = '100%';   
        }
      }, [location]);

    return(
        <>
        <HeaderComponent  headerRef={headerRef}></HeaderComponent>
        <div ref={outletRef}>
        <Outlet ></Outlet>
        </div>
        <FooterComponent footerRef={footerRef}></FooterComponent>
        <AddToCartToastComponent ></AddToCartToastComponent>
        </>
    )
};

export default FrontPagesLayout;

