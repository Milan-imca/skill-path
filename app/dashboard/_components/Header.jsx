import { UserButton } from '@clerk/nextjs';
import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between bg-white/30 backdrop-blur-md border border-white/30 shadow-lg p-5 rounded-xl'>
      <span>ICON</span>
      <UserButton />
    </div>
  )
}

export default Header;