import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../Hooks/useAuth';
import GoogleLogin from './Social Login/GoogleLogin';


const Login = () => {
    const { entryUser } = useAuth()
    let navigate = useNavigate();
    let location = useLocation();
    const [disable, setDisable] = useState(true)
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handelLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        entryUser(email , password)
        .then(()=>{
            Swal.fire({
                title: "logIn successfully ",
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
               navigate(from, { replace: true });
        })
        .catch(()=>{});
    }

    const handelValidation = (e) => {
        const value = e.target.value ;
        if (validateCaptcha(value)) {
            setDisable(false)
        }
        else {
            setDisable(true)
        }
    }

    return (
        <>
         <Helmet>
                <title>IMS || LOGIN</title>
                <link rel="canonical" />
            </Helmet>
        <div className="hero min-h-screen w-11/12 mx-auto bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                   
                </div>
                <div className="card md:w-1/2   max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handelLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div >
                            <LoadCanvasTemplate />
                        </div>
                        <div className="form-control">
                            <input type="text" onBlur={handelValidation} className="input input-bordered" required />
                        </div>

                        <div className="form-control mt-6">
                            <input disabled={disable} type="submit" className="btn btn-success bg-blue-800" value="Login" />
                        </div>
                        <p>You dont have a account. Please <Link to={"/register"}><span className=' text-blue-500'>Register</span></Link></p>
                        <GoogleLogin></GoogleLogin>
                    </form>
                </div>
            </div>
           
        </div>
        </>
    );
};

export default Login;