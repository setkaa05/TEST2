import axios from 'axios'

const BASE_URL = 'https://t4e-testserver.onrender.com/api'

export const getToken = async (studentId, password, set) => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId,
    password,
    set,
  })

  return data
}

export const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data.data
}

export const fetchAppData = async (studentId, password, set) => {
  const tokenResponse = await getToken(studentId, password, set)
  const token =
    tokenResponse?.token ||
    tokenResponse?.access_token ||
    tokenResponse?.accessToken ||
    tokenResponse?.jwt
  const dataUrl = tokenResponse?.dataUrl || tokenResponse?.data_url

  if (!token) {
    throw new Error('Token missing in response')
  }

  if (!dataUrl) {
    throw new Error('Data URL missing in response')
  }

  return getDataset(token, dataUrl)
}
