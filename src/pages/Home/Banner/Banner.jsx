import banner from "../../../../public/Inventory-Management-Header.jpg"

const Banner = () => {
    return (
        <div className=" overflow-hidden ">
        <figure><img className="transform scale-150 transition-transform duration-300 ease-in-out hover:scale-100" src={banner} /></figure>
      </div>
    );
};

export default Banner;


