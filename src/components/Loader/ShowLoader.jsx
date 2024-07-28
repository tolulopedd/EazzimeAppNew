"use client";
import { useEffect } from 'react'
import { useLoader } from '@/hooks'

const ShowLoader = () => {
  const {displayLoader, hideLoader} = useLoader()
  useEffect(() => {
    displayLoader()
    return () => {
      hideLoader()
    }
  }, [displayLoader, hideLoader])
  
  return null
}

export default ShowLoader