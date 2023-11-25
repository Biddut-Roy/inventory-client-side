

const Footer = () => {
  return (
    <footer className="">
      <div className="footer px-10 pt-10 bg-base-200 text-base-content ">
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Shop</a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <nav>
          <header className="footer-title">Newsletter</header>
          <fieldset className="nav-control ">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input type="text" placeholder="username@site.com" className="input input-bordered join-item" />
              <button className="btn btn-primary bg-blue-800 join-item">Subscribe</button>
            </div>
          </fieldset>
        </nav>      
      </div>
        <div className=" text-center p-10 bg-base-200 text-base-content">
          <p>Copyright © 2023 - All right reserved by Inventory </p>
        </div>
    </footer>

  );
};

export default Footer;