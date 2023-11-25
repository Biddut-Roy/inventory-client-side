import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import usePublicAxios from "../../../Hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";



const Review = () => {
    const publicAxios = usePublicAxios();


    const { isPending, error, data = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async () =>{
            const res = await publicAxios.get('/review')
            return res.data
        }
    })


    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className=" mb-10">
            <section>

                <div className=" my-10">
                    <Swiper
                        pagination={{
                            type: 'fraction',
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {
                            data?.map(review => <SwiperSlide key={review._id}>

                                <div className=" my-5 mx-10 flex flex-col items-center">
                                    <Rating
                                        style={{ maxWidth: 180 }}
                                        value={review?.rating}
                                        readOnly
                                    />
                                    <p className=" mx-10">{review?.details}</p>
                                    <p className=" pb-5">{review?.name}</p>
                                </div>
                            </SwiperSlide>)
                        }
                    </Swiper>
                </div>
            </section>
        </div>
    );
};

export default Review;