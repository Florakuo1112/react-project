import {NavLink, Link} from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";

import {  useSelector } from 'react-redux';
import { useState,useEffect } from 'react';

function NavLinkComponent(){
    return(<>
            <NavLink to='./login' className='navLink ms-2' >店長專區</NavLink> 
            <NavLink to='./' className='navLink ms-2' >內部首頁</NavLink> 
            <NavLink to='./productlist' className='navLink ms-2'  >訂單系統</NavLink> 
    </>)
}
function HeaderComponent({headerRef}){
    const cartItems = useSelector((state) => state.cartStatus.cartItems);
    const [showHamberger, setShowHamberger] = useState(false);
    return(
       <>
       <header className='py-2 mx-0' ref={headerRef} >
            <div className="container  d-flex justify-content-between align-items-center">
                {/* logo */}
                <Link className="d-flex link">
                    <img src="public/coconutTree.jpg" alt="Logo" style={{height:'30px'}} className="rounded-circle"></img>
                    <h3 className='playwrite-it-moderna text-light  mb-0 ms-1' >Caliwoof Pet</h3> 
                </Link>

                <div className='d-flex'>
                    {/* nav展開*/}
                    <div  className="d-md-flex align-items-center d-none">
                        <NavLinkComponent></NavLinkComponent>
                    </div>                    
                    {/* cart */}
                    <NavLink to='./cart' className='navLink position-relative ms-2 ' >
                        <FontAwesomeIcon icon={faCartShopping} size="2x" className='' />
                        <span style={{backgroundColor:"#f0e6c0"}}
                        className="badge text-dark position-absolute top-0 start-100 translate-middle
                        badge rounded-pill
                        ">{cartItems.length> 0 && cartItems.length}</span>
                    </NavLink>
                    {/* 漢堡*/}
                    <button className='bg-transparent border-0'>
                    <FontAwesomeIcon icon={faBars}  size="2x"  className='navLink d-block d-md-none ms-2'
                    onClick={()=> {setShowHamberger(!showHamberger)}}
                    />
                    </button>
                </div>
                                                                          
            </div>
            <div className={`container ${showHamberger ? 'd-flex':'d-none'} flex-column align-items-center `}>
            <NavLinkComponent></NavLinkComponent>
            </div>
        </header>
        </> 
    )
};

export default HeaderComponent;