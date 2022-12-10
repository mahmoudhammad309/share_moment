import React, { useState, useEffect, useRef } from 'react';
import { useRouteError, Link, Route, Routes } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { SideBar, UserProfile } from '../components';
import Pins from '../container/Pins';
import { client } from '../client';
import logo from '../assets/logo.png';

// CLIENT USER QUERY
import { userQuery } from '../utils/data';

const Home = () => {
  const error = useRouteError();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <SideBar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row  justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => {
              setToggleSidebar(true);
            }}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-38" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt={user?.userName}
              className="w-16 rounded-full"
            />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <SideBar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
