import axios from "axios";
import React, { useState, useEffect, useContext, useMemo } from "react";

export const PosesContext = React.createContext()

export default function PosesProvider ({children}) {
  // const [activePose, setActivePose] = useState(0)
  const [poses, setPoses] = useState([])

  useEffect(() => {
    let isMounted = true
    const fetchPoses = async () => {
      try {
        const {data} = await axios.get('/api/poses')
        setPoses(data)
      } catch (error) {
        console.error(error)
      }
    }
    if(isMounted) fetchPoses()

    return () => {
      isMounted = false
    }
  }, [])

  const providerValue = useMemo(() => {
    return {
      poses,
      setPoses
    }
  }, [poses])

  return (
    <PosesContext.Provider value={providerValue}>
      {children}
    </PosesContext.Provider>
  )
}

