import banner from "../../../../public/Inventory-Management-Header.jpg"

const Banner = () => {
    return (
        <div className=" overflow-hidden ">
        <figure><img className="transform scale-100 transition-transform duration-300 ease-in-out hover:scale-150" src={banner} /></figure>
      </div>
    );
};

export default Banner;


