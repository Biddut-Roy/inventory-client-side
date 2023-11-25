import AOS from 'aos';
import 'aos/dist/aos.css';
import PropTypes from 'prop-types';

const Card = ({ partner }) => {
    const { img } = partner;

    AOS.init({
        easing: 'ease-out-quart',
        delay: 0,
        duration: 750
        })

  
    return (
        <div data-aos="flip-up">
            <div className="card glass h-full md:h-[100px] lg:h-[100px]">
                <figure><img className='object-cover' src={img} alt="partner!" /></figure>
            </div>
        </div>
    );
};

Card.propTypes = {
    partner: PropTypes.shape({
        img: PropTypes.string.isRequired,
    }).isRequired,
};
export default Card;