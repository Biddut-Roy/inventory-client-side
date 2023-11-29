import { Navigate, useLocation } from "react-router-dom"
import PropTypes from 'prop-types';
import Lottie from "lottie-react";
import loadings from '../../public/loading.json'
import useAuth from "../Hooks/useAuth";
import useStoreAdmin from "../Hooks/useStoreAdmin";


const ShopAdminRoute = ({children}) => {
    const location = useLocation();
    const {user , loading} = useAuth();
    const [isStoreAdmin , isStoreLoading]= useStoreAdmin();


    if (loading || isStoreLoading) {
        
       return<Lottie className=" mx-auto h-24 md:h-32 lg:h-96 w-10/12" animationData={loadings} loop={true} />
    }

    if (user && isStoreAdmin) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

ShopAdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };


export default ShopAdminRoute;