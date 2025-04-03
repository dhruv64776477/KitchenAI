import React, { useState, useEffect } from "react";
import { BarChart2, Home, Calendar, List } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../App.jsx';

const MobileNav = () => {
   const location = useLocation();
   const { darkMode } = React.useContext(ThemeContext);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
   
   useEffect(() => {
     const handleResize = () => setIsMobile(window.innerWidth < 768);
     window.addEventListener('resize', handleResize);
     return () => window.removeEventListener('resize', handleResize);
   }, []);
   
   if (!isMobile) return null;

   const activeColor = darkMode ? 'text-green-400' : 'text-green-600';
   const inactiveColor = darkMode ? 'text-gray-400' : 'text-gray-500';
   const bgColor = darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300';
   const activeIconColor = darkMode ? 'text-green-400' : 'text-green-600';
   const inactiveIconColor = darkMode ? 'text-gray-400' : 'text-gray-500';
   
   return (
     <div className={`fixed bottom-0 left-0 right-0 ${bgColor} border-t flex justify-around py-2 md:hidden`}>  
       <Link to="/" className={`flex flex-col items-center p-2 ${location.pathname === '/' ? activeColor : inactiveColor}`}>
         <Home size={24} className={location.pathname === '/' ? activeIconColor : inactiveIconColor} />
         <span className={`text-xs mt-1 ${location.pathname === '/' ? activeColor : inactiveColor}`}>Home</span>
       </Link>
       <Link to="/fridge" className={`flex flex-col items-center p-2 ${location.pathname === '/fridge' ? activeColor : inactiveColor}`}>
         <BarChart2 size={24} className={location.pathname === '/fridge' ? activeIconColor : inactiveIconColor} />
         <span className={`text-xs mt-1 ${location.pathname === '/fridge' ? activeColor : inactiveColor}`}>Fridge</span>
       </Link>
       <Link to="/meals" className={`flex flex-col items-center p-2 ${location.pathname === '/meals' ? activeColor : inactiveColor}`}>
         <Calendar size={24} className={location.pathname === '/meals' ? activeIconColor : inactiveIconColor} />
         <span className={`text-xs mt-1 ${location.pathname === '/meals' ? activeColor : inactiveColor}`}>Meals</span>
       </Link>
       <Link to="/grocery" className={`flex flex-col items-center p-2 ${location.pathname === '/grocery' ? activeColor : inactiveColor}`}>
         <List size={24} className={location.pathname === '/grocery' ? activeIconColor : inactiveIconColor} />
         <span className={`text-xs mt-1 ${location.pathname === '/grocery' ? activeColor : inactiveColor}`}>Grocery</span>
       </Link>
     </div>
   );
};

export default MobileNav;