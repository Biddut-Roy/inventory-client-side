
import partnerData from '../../../assets/partner.json'
import Card from './Card';


const Partner = () => {


  return (
    <div data-aos="flip-up" className='w-11/12 mx-auto grid grid-cols-2  lg:grid-cols-5 gap-5 lg:gap-10'>
      {
        partnerData?.map(partner =><Card partner={partner} key={partner.id}></Card>)
      }
    </div>
  );
};

export default Partner;