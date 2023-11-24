

const Login = () => {


    return (
        <>

        <div className="hero min-h-screen w-11/12 mx-auto bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card md:w-1/2   max-w-sm shadow-2xl bg-base-100">
                    <form  className="card-body">
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
                            
                        </div>
                        <div className="form-control">
                            <input type="text"  className="input input-bordered" required />
                        </div>

                        <div className="form-control mt-6">
                            <input  type="submit" className="btn btn-primary bg-blue-800" value="Login" />
                        </div>
                        
                        
                    </form>
                </div>
            </div>
           
        </div>
        </>
    );
};

export default Login;