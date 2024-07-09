import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-slate-500 ">
        <div className="mycontainer  flex justify-between items-center">

        <div className="logo font-extrabold text-2xl"><span className="text-lime-300 ">&lt;</span><span>PassThe</span><span className="text-lime-300">Key</span><span className="text-lime-300">/&gt;</span></div>
        {/* <ul className="flex gap-[20px]">
            <li className=" flex gap-4">
                <a className="hover:font-bold hover:text-lime-300" href="/">Home</a>
                <a className="hover:font-bold hover:text-lime-300"  href="#">About</a>
                <a className="hover:font-bold hover:text-lime-300"  href="#">Contact</a>
            </li>
          
        </ul> */}
        <button className="text-black font-semibold hover:bg-lime-300 rouded-full bg-white rounded-full" onClick={() => window.open('https://github.com/vikash9669', '_blank')}><img className="w-8 " src="img/github.svg" alt="GitHub" /></button>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
