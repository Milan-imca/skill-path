import React from 'react'
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'
import Navbar from '../components/Navbar'


const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <AddCourse />
      <UserCourseList />
    </div>
  )
}

export default Dashboard