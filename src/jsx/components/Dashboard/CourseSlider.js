import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link} from 'react-router-dom';

import school from './../../../images/svg/school.svg';
import wallet from './../../../images/svg/cryptowallet.svg';
import crypto from './../../../images/svg/cryptocurrency.svg';
import transfer from './../../../images/svg/wire-transfer.svg';
const smallCard = [
    { image: school, title:'Trade History' },
    { image: wallet, title:'Quick Transfer' },
    { image: crypto, title:'Your Investments' },
    { image: transfer, title:'Exchange' },
];

const CourseSlider = () =>{
    return(
        <Swiper className="swiper swiper-container course-slider"
            spaceBetween={30}
            slidesPerView={4}
            breakpoints= {{
                360: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                600: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1400: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                1920: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }}
        >  
            {smallCard.map((data, index)=>(
                <SwiperSlide key={index}>
                    <div class="card">
                        <div class="card-body">
                            <div class="widget-courses align-items-center d-flex justify-content-between flex-wrap">
                                <div class="d-flex align-items-center flex-wrap">
                                    <img src={data.image} alt="" />
                                    <div class="flex-1 ms-3">
                                        <h4>{data.title}</h4>
                                        <span>Lorem ipsum dolor</span>
                                    </div>	
                                </div>	
                                <Link to={"#"}><i class="las la-angle-right text-primary"></i></Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}  
        </Swiper>
    )
}

export default CourseSlider;