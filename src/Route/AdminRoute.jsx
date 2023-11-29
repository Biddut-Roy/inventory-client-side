import { Navigate, useLocation } from "react-router-dom"
import PropTypes from 'prop-types';
import Lottie from "lottie-react";
import loadings from '../../public/loading.json'
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";


const AdminRoute = ({children}) => {
    const location = useLocation()
    const {user} = useAuth()
    const [isAdmin , isLoading] = useAdmin()


    if (isLoading) {
        
       return<Lottie className=" mx-auto h-24 md:h-32 lg:h-96 w-10/12" animationData={loadings} loop={true} />
    }

    if (user && isAdmin.isAdmin) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};
AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };


export default AdminRoute;