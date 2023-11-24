import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import sw1 from '../../../assets/home/slide1.jpg'





const Swipers = () => {
    return (            
        <>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                <SwiperSlide><img src={sw1} alt="" /></SwiperSlide>
                <SwiperSlide><img src={sw1} alt="" /></SwiperSlide>
                <SwiperSlide><img src={sw1} alt="" /></SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
        </>
    );
};

export default Swipers;