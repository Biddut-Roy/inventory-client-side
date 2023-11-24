import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import usePublicAxios from "../../../Hooks/usePublicAxios";




const GoogleLogin = () => {
    const { googleEntry } = useAuth()
    const navigate = useNavigate()
    const publicAxios = usePublicAxios()
    const handelGoogleLogin = () => {
        googleEntry()
            .then((result) => {
                const userData ={
                    email: result.user?.email ,
                    name: result.user?.displayName

                }
                publicAxios.post("" , userData)
                .then((result) => {
                    console.log(result.data);
                    if (result.data) {
                        navigate("/")
                        Swal.fire({
                            title: "registered successfully ",
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
                    }
                   
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

export default GoogleLogin ;