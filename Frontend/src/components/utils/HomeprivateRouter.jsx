import React, { useEffect, useState } from 'react'
import { Route, useNavigate } from 'react-router-dom'

const HomePrivateRouter = ({children}) => {
  const [Details, setDetails] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    setDetails(localStorage.getItem('access'))
  }, [])
  
  if(Details === null)
    return navigate('/')
  else
  return children
}

export default HomePrivateRouter