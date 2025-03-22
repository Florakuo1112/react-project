import { useState,useEffect } from 'react'
import axios  from 'axios';

import FullCalendar from '../../components/CalendarComponent';
import LoadingComponent from '../../components/LoadingComponent';


// API_PATH
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


function AdminComingCalendarView(){
    const [loading, setLoading] = useState(false);
    const [calendarData, setCalendarData] = useState([]);

    useEffect(() => {
        fetchOrders();
    },[]);

    async function fetchOrders(){
        setLoading(true);
        let commingArr = [];
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/admin/orders`);
            const orders = res.data.orders;
            //遍歷所有orders
            orders.forEach((order) => {
                let categoryArr = [];
                //找每個項目item的id,會是陣列
                const itemsIdArr = Object.keys(order.products)
                //利用id去找category
                itemsIdArr.forEach((id) => {
                    const idCategory = order.products[id].product.category;
                    if(!categoryArr.includes(idCategory)){
                        categoryArr.push(idCategory);
                    }
                });
                //找到飼主的名字,找到毛孩的名字,服務
                const content = `${categoryArr.join('&')}:${order.user.name}/${order.user.petName}`

                order.user.comingDate.forEach((date)=>{
                    const comingDetail = {'start':date, "title":content};
                    commingArr.push(comingDetail);
                })
            })
            setCalendarData(commingArr)

        } catch (error) {
            
        }finally{
            setLoading(false);
        }

    };

    return(<>
    {
        loading &&<LoadingComponent type={'spin'} color={"#FF8C00"}/>
    }
    <div>
    <h4>毛孩來店行事曆</h4>
    <FullCalendar
    className="bg-primary"
    initialView="dayGridMonth"
    weekends={true}
    events={calendarData}
    />
    </div>

    </>)
};

export default AdminComingCalendarView;