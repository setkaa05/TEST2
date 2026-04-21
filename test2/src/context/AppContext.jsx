/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useReducer } from 'react'
import appReducer, { initialState } from '../reducer/AppReducer'
import { fetchAppData } from '../services/api'

const CREDENTIALS = {
  studentId: 'E0223023',
  password: '633192',
  set: 'setA',
}

export const AppContext = createContext(initialState)

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      dispatch({ type: 'FETCH_START' })
      try {
        const data = await fetchAppData(
          CREDENTIALS.studentId,
          CREDENTIALS.password,
          CREDENTIALS.set,
        )
        if (!isMounted) return
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (error) {
        if (!isMounted) return
        dispatch({
          type: 'FETCH_ERROR',
          payload: error?.message || 'Failed to load data',
        })
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
