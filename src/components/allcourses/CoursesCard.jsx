import React, {useEffect, useState} from "react"
import "./courses.css"
import useFetch from "../../useFetch";
import {ArrowDownwardSharp, ArrowUpwardSharp, PeopleAltRounded, PlayCircle, Sort} from "@mui/icons-material";
import {useLocation} from "react-router-dom";

const CoursesCard = () => {
  const {data, loading, error, reFetch} = useFetch(
    "/_next/data/xvBueWQUQDU0vQ_MVeBNu/bn/courses.json?courseType=courses"
  );
  const [courses, setCourses] = useState([]);
  const [isAsc, setIsAsc] = useState();
  const {state } = useLocation();
  const id = state?.id;

  useEffect(() => {
    if (data) setCourses([...data?.pageProps?.BBCourses?.data
      ?.filter(course => id ? course?.categories?.find(c => c.id === id) : course)]);
  }, [data]);
  useEffect(() => {
    const courses = getFilteredAndSortedElements();
    if (courses) setCourses([...courses]);
  }, [isAsc]);

  const getFilteredAndSortedElements = () => {
    if (isAsc === undefined) return data?.pageProps?.BBCourses?.data
      ?.filter(course => id ? course?.categories?.find(c => c.id === id) : course);
    return courses?.sort((a1, a2) => isAsc ? a1?.sale_price - a2?.sale_price : a2?.sale_price - a1?.sale_price)
      ?.filter(course => id ? course?.categories?.find(c => c.id === id) : course);
  }

  return (
    <div className="pb-8">
      <div className="flex justify-end px-8 text-gray-900 py-4">
        <span className="text-black border-2 p-1 cursor-pointer">
          {isAsc === undefined ? (
            <Sort onClick={() => setIsAsc(true)}/>
          ) : isAsc
            ? <ArrowUpwardSharp onClick={() => setIsAsc(false)}/>
            : <ArrowDownwardSharp onClick={() => setIsAsc(undefined)}/>
          }
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 px-8">
        {courses?.map((course) => (
          <div className="flex flex-col bg-white rounded shadow-2xl">
            <div className="w-full h-48">
              <img className="w-full h-48 object-fill" src={course?.thumbnail_url} alt="#"/>
            </div>
            <div className="flex flex-col h-full justify-between gap-2 p-3">
              <span className="font-semibold text-xl">{course?.name_en}</span>
              <h3 className="font-semibold text-black">৳ {course?.sale_price}</h3>
              <div className="flex justify-between text-gray-500 text-sm">
                <span className="flex gap-1 justify-center items-center">
                <PlayCircle className="w-0.5 h-0.5"/>
                  {course?.no_of_lessons}
                </span>
                <span className="flex gap-1 justify-center items-center">
                  <PeopleAltRounded
                    className="w-0.5 h-0.5"/> {course?.number_of_students_enrolled} </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CoursesCard
