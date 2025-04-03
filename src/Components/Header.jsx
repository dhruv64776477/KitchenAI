import React, { useState, useEffect } from "react";
import { User, Menu, Search, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../App.jsx';


const Header = () => {
   const [searchOpen, setSearchOpen] = useState(false);
   const [menuOpen, setMenuOpen] = useState(false);
   const location = useLocation();
   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
   const { darkMode, toggleDarkMode } = React.useContext(ThemeContext);
   
   // Handle window resize
   useEffect(() => {
     const handleResize = () => setIsMobile(window.innerWidth < 768);
     window.addEventListener('resize', handleResize);
     return () => window.removeEventListener('resize', handleResize);
   }, []);
   
   // Toggle search panel
   const handleSearchToggle = () => setSearchOpen(!searchOpen);

   
   return (
     <header className={`${darkMode ? 'bg-green-700 text-white' : 'bg-green-600 text-white'} p-4 flex justify-between items-center`}>
       <Link to="/" className="logo text-2xl font-bold flex items-center gap-2">
         <span className="text-white">FridgeSmart</span>
       </Link>
       
       {!isMobile && (
         <nav className="hidden md:flex gap-6">
           <Link to="/" className={location.pathname === '/' ? 'font-bold' : ''}>Home</Link>
           <Link to="/fridge" className={location.pathname === '/fridge' ? 'font-bold' : ''}>Fridge</Link>
           <Link to="/meals" className={location.pathname === '/meals' ? 'font-bold' : ''}>Meals</Link>
           <Link to="/grocery" className={location.pathname === '/grocery' ? 'font-bold' : ''}>Grocery</Link>
         </nav>
       )}
       
       <div className="flex gap-4 ">
         <div className="cursor-pointer" onClick={handleSearchToggle}><Search size={20} /></div>
         <div className="cursor-pointer" onClick={toggleDarkMode}>
           {darkMode ? <Sun size={20} /> : <Moon size={20} />}
         </div>
         <Link to='/login' className="cursor-pointer"><User size={20} /></Link>
         
       </div>
       
       {searchOpen && (
         <div className={`absolute top-16 right-0 left-0 ${darkMode ? 'bg-gray-700' : 'bg-white'} p-4 shadow-md z-10`}>
           <div className="flex border rounded">
             <input 
               type="search" 
               placeholder="Search items..." 
               className={`p-2 w-full outline-none ${darkMode ? 'bg-gray-600 text-white placeholder-gray-300' : 'bg-white'}`}
             />
             <button className={`${darkMode ? 'bg-gray-500' : 'bg-green-600'} text-white px-4`}><Search size={20} /></button>
           </div>
         </div>
       )}
      
     </header>
   );
 };


 export default Header;