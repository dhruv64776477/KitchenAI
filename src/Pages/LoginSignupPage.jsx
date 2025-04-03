import react,{ useState } from "react";
import GoogleSignInButton from "../Components/GoogleButton";
export default function LoginSignupPage() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    <div className="bg-[#f6f5f7] flex justify-center items-center flex-col font-['Montserrat',sans-serif] h-screen -mt-5 text-black">
      <div
        className={`bg-white rounded-lg shadow-2xl relative overflow-hidden w-full max-w-[768px] min-h-[480px] ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
      >
        {/* Sign Up Container */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 ${
            isRightPanelActive
              ? "transform translate-x-full opacity-100 z-5"
              : "opacity-0 z-1"
          }`}
        >
          <form className="bg-white flex items-center justify-center flex-col px-12 h-full text-center">
            <h1 className="text-black font-bold m-0">Create Account</h1>
            <div className="my-5">
              <GoogleSignInButton/>
            </div>
            <span className="text-xs text-black">or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              className="bg-[#eee] border-none py-3 px-4 my-2 w-full text-black rounded-m "
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-[#eee] border-none py-3 px-4 my-2 w-full text-black rounded-m "
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-[#eee] border-none py-3 px-4 my-2 w-full text-black rounded-m "
            />
            <button className="rounded-full border border-[#209913] bg-[#209913] text-white text-xs font-bold py-3 px-12 tracking-wider uppercase transition duration-80 ease-in active:scale-95 focus:outline-none mt-4">
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Container */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-2 ${
            isRightPanelActive ? "transform translate-x-full" : ""
          }`}
        >
          <form className="bg-white flex items-center justify-center flex-col px-12 h-full text-center">
            <h1 className="font-bold m-0 text-black">Sign in</h1>
            <div className="my-5">
              <GoogleSignInButton/>
            </div>
            <span className="text-xs text-black">or use your account</span>
            <input
              type="email"
              placeholder="Email"
              className="bg-[#eee] border-none py-3 px-4 my-2 w-full text-black rounded-m"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-[#eee] border-none py-3 px-4 my-2 w-full text-black rounded-m"
            />
            <a href="#" className="text-[#333] text-sm no-underline my-4">
              Forgot your password?
            </a>
            <button className="rounded-full border border-[#209913] bg-[#209913] text-white text-xs font-bold py-3 px-12 tracking-wider uppercase transition duration-80 ease-in active:scale-95 focus:outline-none">
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Container */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-100 ${
            isRightPanelActive ? "transform -translate-x-full" : ""
          }`}
        >
          <div
            className={`bg-gradient-to-r from-[#1fbb27] to-[#41ffa3] bg-no-repeat bg-cover bg-[0_0] text-white relative -left-full h-full w-[200%] transform transition-transform duration-600 ease-in-out ${
              isRightPanelActive ? "translate-x-1/2" : "translate-x-0"
            }`}
          >
            {/* Overlay Left Panel */}
            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out ${
                isRightPanelActive ? "translate-x-0" : "-translate-x-1/5"
              }`}
            >
              <h1 className="font-bold m-0">Welcome Back!</h1>
              <p className="text-sm font-thin leading-5 tracking-wider my-5 mx-0">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="rounded-full border border-white bg-transparent text-white text-xs font-bold py-3 px-12 tracking-wider uppercase transition duration-80 ease-in active:scale-95 focus:outline-none"
                onClick={handleSignInClick}
              >
                Sign In
              </button>
            </div>

            {/* Overlay Right Panel */}
            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 right-0 transform transition-transform duration-600 ease-in-out ${
                isRightPanelActive ? "translate-x-1/5" : "translate-x-0"
              }`}
            >
              <h1 className="font-bold m-0">Hello, Friend!</h1>
              <p className="text-sm font-thin leading-5 tracking-wider my-5 mx-0">
                Enter your personal details and start journey with us
              </p>
              <button
                className="rounded-full border border-white bg-transparent text-white text-xs font-bold py-3 px-12 tracking-wider uppercase transition duration-80 ease-in active:scale-95 focus:outline-none"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}