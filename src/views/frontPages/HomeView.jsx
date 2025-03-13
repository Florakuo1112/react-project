import { useState,useEffect } from 'react';
import {Link} from 'react-router';
import FullCalendar from '../../components/CalendarComponent';
import calendarOriginData from '../../../public/TaiwanCalendar.json'
import OurTeamComponent from '../../components/OurTeamsComponent';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


function HomeView(){
    const [calendarData, setCalendarData] = useState([]);

    useEffect(() => {
        getCalendarData();
    },[]);

    function getCalendarData(){
        const data = calendarOriginData;
        const newData = data.filter((item) => item.title !== "");
        setCalendarData(newData);
    };
    return(
        <>
        {/* 主圖區塊 */}
        <section >
            <div className="container" >
                <div  className=" p-md-5 d-md-flex justify-content-center align-items-center d-none ">
                    <div>
                        <div className='d-flex align-items-center'>
                            <span className="material-symbols-outlined fs-1">roofing</span>
                            <h1 className='playwrite-it-moderna mb-0 ms-1  ' >Caliwoof Pet</h1>  
                        </div>
                        <h1>家裏窩寵物旅館</h1>
                        <p>為毛孩提供舒適和愛，就像自己的家一樣</p>
                        <Link to="/productlist" className='btn btn-link d-flex align-items-center pt-3 ps-0' style={{textDecoration:'none', color:"#000000"}}>
                            <p className='fs-4 mb-0 me-3'>預約與訂單管理系統</p>
                            <span className="material-symbols-outlined" style={{fontSize:50}}>step</span>
                        </Link>
                    </div>
                    
                    <img src='/catWithCase.png' style={{'maxWidth':'50%'}} className="img-fluid  d-block ps-5" alt="indexPhoto" />
                </div>

                <div  className=" p-5 d-md-none">
                    <img src='/catWithCase.png' style={{'maxWidth':'100%'}} className="img-fluid  d-block " alt="indexPhoto" />
                    <div className=' d-flex justify-content-center'>
                    <div>
                        <div className='d-flex align-items-center'>
                            <span className="material-symbols-outlined fs-1">roofing</span>
                            <h1 className='playwrite-it-moderna mb-0 ms-1  ' >Caliwoof Pet</h1>  
                        </div>
                        <h1>家裏窩寵物旅館</h1>
                        <p>為毛孩提供舒適和愛，就像自己的家一樣</p>
                        <Link to="/productlist" className='btn btn-link d-flex align-items-center pt-0 ps-0' style={{textDecoration:'none', color:"#000000"}}>
                            <p className='fs-5 mb-0 me-3'>前往訂單系統</p>
                            <span className="material-symbols-outlined" style={{fontSize:50}}>step</span>
                        </Link>
                    </div>
                    </div>               
                </div>
            </div>
        </section>


        <section>
            <div className="container p-5 d-none d-md-block ">
                <h2>夥伴</h2>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    slidesPerView={3}
                    autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                    clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper">
                        <SwiperSlide>
                            <OurTeamComponent link="/boss.png" title="店長 Angela" introduction="我是店長Angela，今年28歲。有四狗一貓，夢想是經營一間寵物旅館並將對動物的爱心注入到每一天的工作"></OurTeamComponent>
                        </SwiperSlide>
                        <SwiperSlide>
                            <OurTeamComponent link="/美容師.png" title="美容師 佩佩" introduction="擁有國家認證的寵物美容丙級證照，喜歡和毛孩相處幫他們打扮的漂漂亮亮"></OurTeamComponent>
                        </SwiperSlide>
                        <SwiperSlide>
                            <OurTeamComponent link="/保母.png" title="保母 Emma" introduction="我是毛孩的幼稚園老師，不僅對毛孩有耐心及愛心，更提供毛孩基礎社會化訓練"></OurTeamComponent>
                        </SwiperSlide>
                        <SwiperSlide>
                            <OurTeamComponent link="/助理.png" title="助理 Nina" introduction="我付責接待爸爸媽媽與安排毛孩的房間與接送，雖然是小助理但是肩負大任。"></OurTeamComponent>
                        </SwiperSlide>
                </Swiper>
            </div>
        </section>

        <section>
            <div className="container p-5 d-md-none ">
                <h2>夥伴</h2>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    slidesPerView={1}
                    autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                    clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper">
                        <SwiperSlide>
                            <OurTeamComponent link="/boss.png" title="店長 Angela" introduction="我是店長Angela，今年28歲。有四狗一貓，夢想是經營一間寵物旅館並將對動物的爱心注入到每一天的工作"></OurTeamComponent>
                        </SwiperSlide>
                        <SwiperSlide>
                            <OurTeamComponent link="/美容師.png" title="美容師 佩佩" introduction="擁有國家認證的寵物美容丙級證照，喜歡和毛孩相處幫他們打扮的漂漂亮亮"></OurTeamComponent>
                        </SwiperSlide>
                        <SwiperSlide>
                            <OurTeamComponent link="/保母.png" title="保母 Emma" introduction="我是毛孩的幼稚園老師，不僅對毛孩有耐心及愛心，更提供毛孩基礎社會化訓練"></OurTeamComponent>
                        </SwiperSlide>
                        <SwiperSlide>
                            <OurTeamComponent link="/助理.png" title="助理 Nina" introduction="我付責接待爸爸媽媽與安排毛孩的房間與接送，雖然是小助理但是肩負大任。"></OurTeamComponent>
                        </SwiperSlide>
                </Swiper>
            </div>
        </section>
        
        <section>
            <div className="container p-5 ">
                <h2>家裏窩行事曆</h2>
                <div className="row">
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <img src='/calendarPhoto.png' alt="calendarPhoto" style={{'maxWidth':'90%'}}/>
                    </div>
                    <div className=" col-12 col-md-8">
                    <FullCalendar
                    className="bg-primary"
                    initialView="dayGridMonth"
                    weekends={true}
                    events={calendarData}
                    />
                    </div>
                </div>
            </div>
        </section>
    

        <section>
            <div className="container p-5 ">
                <h2>家裏窩據點</h2>
                <div className="row  flex-column-reverse flex-md-row">
                    <div className="col-md-8">
                        <iframe className='rounded-4' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.81915298344!2d121.43906070000001!3d25.1755836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a50a4a1cc5bd%3A0x831977c0b5b72392!2z5a626KOP56qp5a-154mp5peF6aSoIENhbGl3b29mIFBldCBIb3RlbCAo6aCQ57SE5Yi2KQ!5e0!3m2!1szh-TW!2stw!4v1740324358780!5m2!1szh-TW!2stw" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="col-md-4 d-flex align-items-center">
                        <img src='/location.png' alt="location" style={{'maxWidth':'100%'}}/>
                    </div>
                </div>
            </div>
        </section>

        </>
    )
};

export default HomeView;