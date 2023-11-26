import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import usePublicAxios from "../../../Hooks/usePublicAxios";




const GoogleLogin = () => {
    const { googleEntry } = useAuth()
    const navigate = useNavigate()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const path = location.pathname
    const parts = path.split("/");
    const pathName = parts.length > 1 ? parts[1] : null;
    const publicAxios = usePublicAxios()
    const handelGoogleLogin = () => {
        googleEntry()
            .then((result) => {
                const userData = {
                    name: result.user?.displayName,
                    email: result.user?.email

                }
                navigate(from, { replace: true });
                            Swal.fire({
                                title: `${pathName} successfully `,
                                showClass: {
                                    popup: `
                                    animate__animated
                                    animate__fadeInUp
                                    animate__faster
                                  `
                                },
                                hideClass: {
                                    popup: `
                                    animate__animated
                                    animate__fadeOutDown
                                    animate__faster
                                  `
                                }
                            });
                publicAxios.post("/users", userData)
                    .then((result) => {
                        console.log(result.data);
                        // if (result.data) {
                            
                        // }

                    });

            })
    }

    return (
        <div onClick={handelGoogleLogin} className=" my-5">
            <button className=" btn flex">
                <FcGoogle />
                Google
            </button>
        </div>
    );
};

export default GoogleLogin;