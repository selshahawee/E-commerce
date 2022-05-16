import React from 'react'
import { useSelector } from 'react-redux'
import { setCart } from 'redux/reducers/app'
import { RootState } from 'redux/store'

type props = {
  
  values: string[] | number[]
  value?: string | number
  onChange: (value: string) => void
}
function Dropdown({ values, value = values[0], onChange }: props) {
  
 
  return (
    <select
      id="quantity"
      name="quantity"
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
    >
      {values.map((i,index) => {
        return <option key={index} selected={value === i} value={i}>{i}</option>
      
      })}
    </select>
  )
}

export default Dropdown
