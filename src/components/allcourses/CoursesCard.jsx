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

  const getFilteredElements = (search) => {
    setCourses(data?.pageProps?.BBCourses?.data?.filter(course => !search ? course : course?.name_en.toLowerCase().includes(search)));
  }

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <div className="pb-8">
      <div className="flex justify-end items-center gap-4 px-8 text-gray-900 py-4">
        <div>
          <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white"/>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input type="search" id="default-search"
                   className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
                   focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Search..." required onChange={(event) => {
                      getFilteredElements(event?.target?.value?.toLowerCase())
                   }}/>
          </div>
        </div>

        <span className="text-black border-2 h-full p-1 cursor-pointer">
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
          <div key={course?.id} className="flex flex-col bg-white rounded shadow-2xl cursor-pointer"
               onClick={() => openInNewTab(`https://bohubrihi.com/courses/${course?.slug}`)}>
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
