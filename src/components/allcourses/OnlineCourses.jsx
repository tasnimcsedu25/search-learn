import React, {useEffect, useState} from "react"
import "./courses.css"
import Heading from "../common/heading/Heading"
import useFetch from "../../useFetch";
import {MenuBook} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const OnlineCourses = () => {
  const {data, loading, error, reFetch} = useFetch(
    "/_next/data/xvBueWQUQDU0vQ_MVeBNu/bn/courses.json?courseType=courses"
  );
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setCategories([...data?.pageProps?.bbCourseCategories?.data
        ?.map(category => ({...category,
          image_url: category?.image_url || "https://campustechnology.com/-/media/EDU/CampusTechnology/2019-Images/20191209online.jpg",
          numberOfCourse: data?.pageProps?.BBCourses?.data?.filter(course => course?.categories?.find(c => c.id === category.id))?.length}))
        ?.filter(category => category?.numberOfCourse !== 0)
      ]);
    }
  }, [data]);

  return (
    <div>
      <section>
        <Heading subtitle='COURSES' title='Browse Our Online Courses'/>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 px-8 pb-8">
          {categories?.map((category) => (
            <div key={category?.id} className="flex flex-col bg-white rounded shadow-2xl cursor-pointer" onClick={() => navigate('/courses', {state: {id: category?.id}})}>
              <div className="w-full h-48">
                <img className="w-full h-48 object-fit" src={category?.image_url} alt="#"/>
              </div>
              <div className="flex flex-col h-full justify-end items-center gap-2 p-3">
                <span className="font-semibold text-xl">{category?.name.replaceAll("&amp;", "&")}</span>
                <div className="flex gap-2">
                  <MenuBook />
                  <span>{category?.numberOfCourse} courses</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  )
}

export default OnlineCourses
