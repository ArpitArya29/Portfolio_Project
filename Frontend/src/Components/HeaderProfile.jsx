import React from 'react'
import { useAuthStore } from '../Stores/useAuthStore'
import { NavLink, useNavigate } from 'react-router-dom';

import { User } from 'lucide-react';

const HeaderProfile = () => {

    const { authUser, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async() => {
        await logout();
        navigate("/login");
    }

  return (
    <div className='m-3 flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/90 p-3 sm:hidden'>
        <div className='flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-slate-800 ring-1 ring-white/10'>
            {authUser?.image? (
                <img 
                src={authUser.image}
                alt={authUser.name ? `${authUser.name} profile` : "Profile"}
                className='h-full w-full object-cover'
                />
            ) : (
                <User className='h-7 w-7 text-slate-300' />
            )}
        </div>
      
        <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-semibold text-white'>{authUser?.name || "Your profile"}</p>
            <div className='mt-2 flex flex-wrap gap-2'>
                <NavLink
                    to="/profile"
                    className="rounded-full bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                    View profile
                </NavLink>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-red-500/90"
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
  )
}

export default HeaderProfile
