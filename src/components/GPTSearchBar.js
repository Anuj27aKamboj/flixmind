import React from 'react'
import { useSelector } from 'react-redux'
import lang from "../utils/languageConstants"

const GPTSearchBar = () => {
  const langKey = useSelector(store => store.config.lang);

  return (
    <div className='absolute mt-[45%] w-1/2 z-10 ml-[25%]'>
        <form className='bg-black bg-opacity-80 text-white py-4 px-2 rounded-md grid grid-cols-12'>
            <input type='text' className='p-4 m-4 rounded-md col-span-9 text-black' placeholder={lang[langKey].gptSearchPlaceholder}/>
            <button className='bg-yellow-500 rounded-md p-3 m-4 col-span-3'>
                <img alt='search-icon' src='./searchIcon.png' className='w-7 h-7 mx-auto'/>
            </button>
        </form>
    </div>
  )
}

export default GPTSearchBar