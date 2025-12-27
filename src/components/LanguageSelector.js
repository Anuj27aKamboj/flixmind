import React from 'react'
import { SUPPORRTED_LANGUAGES } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { changeLanguage } from '../utils/configSice'

const LanguageSelector = () => {
    const dispatch = useDispatch()
    const handleLanguageChange = (e)=>{
        dispatch(changeLanguage(e.target.value));
    }


  return (
    <div className='mx-2 mt-0 w-24'>
        <select className='p-2 bg-white bg-opacity-30 text-white rounded-md' onChange={handleLanguageChange}>
            {SUPPORRTED_LANGUAGES.map(lang =><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>
    </div>
  )
}

export default LanguageSelector