// eslint-disable-next-line react/prop-types
function FooterComponent({footerRef}){
    return(<>
            <footer className=' pb-md-3 ' ref={footerRef}>
            <div className="container py-5">
                <div className="row justify-md-content-between justify-content-center">
                    <div className="col-md-4 col-12 d-flex justify-content-center justify-content-md-start">
                        <div className='d-flex align-items-center pb-2'>
                            <img src="../../public/coconutTree.jpg" alt="Logo" style={{height:'50px'}} className="rounded-circle"></img>
                            <div className='ms-2'>
                            <h3 className='playwrite-it-moderna text-light  mb-0' >Caliwoof Pet</h3> 
                            <p className='text-light mb-0' >家裏窩寵物旅館</p>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-6  pt-2">
                        <p className='text-light mb-0' >地址: 251新北市淡水區新民街31號</p>
                        <p className='text-light mb-0' >電話: (02)2621-3621</p> 
                        <p className='text-light mb-0' >特寵業字第A1121155號</p>
                    </div>
                    <div className="col-md-4 col-12">
                    <div className='d-flex align-items-center justify-content-center justify-content-md-end pt-3'>
                            <a className="me-3" href="https://www.facebook.com/p/Caliwoof-Pet-Hotel-Spa-%E5%AE%B6%E8%A3%8F%E7%AA%A9%E5%AF%B5%E7%89%A9%E6%97%85%E9%A4%A8-100092542265978/?locale=zh_TW">
                                <img src="../../public/FacebookIcon.png" alt="Logo" style={{height:'30px'}} className="rounded-circle"></img>
                            </a>
                            <a className="me-3" href="https://www.instagram.com/caliwoooof/">
                                <img src="../../public/InstagramIcon.png" alt="Logo" style={{height:'30px'}} className="rounded-circle"></img>
                            </a>
                            <a href="tel:0226213621">
                                <img src="../../public/TelIcon.png" alt="Logo" style={{height:'30px'}} className="rounded-circle"></img>
                            </a>
                    </div>
                    </div>
                </div>
                <div>
                    <p className='text-center pt-3 mb-0'>Copyright (C): 此專案為開發者Flora Kuo協助家裏窩寵物旅館開發之內部網站初稿，僅做為個人專案作品使用<br />
                    插圖採用https://www.shigureni.com/可商用圖庫</p>
                </div>
            </div>
        </footer>
    </>)
};

export default FooterComponent;