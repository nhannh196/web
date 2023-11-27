import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

//import "swiper/css";

import { Autoplay } from "swiper";
import { BigIconFirst, BigIconSecond,
    BigIconThird,BigIconFourth
} 
from './Icon';

const sliderData = [
	{icon: BigIconFirst, title:'Bitcoin', change:'secondary', number:'33.568,60', imageColor:'#BE7CFF'},
	{icon: BigIconSecond, title:'Ethereum', change:'blue', number:'43.123,65', imageColor:'#1ABAFF'},
	{icon: BigIconThird, title:'Litecoin', change:'green', number:'25.987,10', imageColor:'#40CD68'},
	{icon: BigIconFourth, title:'Ripplecoin', change:'pink', number:'38.456,50',imageColor:'#F272FD'},
];

export default function CryptoSlider() {
	
	return (
		<>
			<Swiper className="crypto-Swiper position-relative overflow-hidden"						
				speed= {1500}
				parallax= {true}
				slidesPerView= {4}
				spaceBetween= {30}
				loop={false}
				modules={[ Autoplay ]}
				breakpoints = {{
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                      },	
                      576: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                      },
                      991: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },
                      1200: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },
                      1600: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
				}}
			>	
				{sliderData.map((d,i)=>(
					<SwiperSlide key={i}>						
						<div className={`card coin-card ${d.change}`}>
                <div className="back-image">
                    <svg width="121" height="221" viewBox="0 0 121 221" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="135.5" cy="84.5" r="40" stroke={d.imageColor}/>
                        <circle cx="136" cy="85" r="135.5" stroke={d.imageColor}/>
                        <circle cx="136" cy="85" r="109.5" stroke={d.imageColor}/>
                        <circle cx="136" cy="85" r="86.5" stroke={d.imageColor}/>
                        <circle cx="136" cy="85" r="64.5" stroke={d.imageColor}/>
                    </svg>
                </div>
                <div className="card-body p-4 ">
                    <div className="title">
                        <h4>{d.title}</h4>
                        {d.icon}
                    </div>
                    <div  className="chart-num">
                        <h2>${d.number}</h2>
                        <span>+12,4%</span>
                    </div>
                </div>	
            </div>		
					</SwiperSlide>
				))}				
			</Swiper>
		</>
	)
}