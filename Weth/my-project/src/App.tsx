import axios from 'axios'
import { useEffect, useState } from 'react'
import './index.css'

import CityForm from './components/CityForm'
import WeatherCard from './components/WeatherCard'
import WeatherDetails from './components/WeatherDetails'
import Forecast from './components/Forecast'
import type { ForecastItem } from './components/Forecast'
function App() {
  interface WeatherData {
    main: {
      pressure: number
      humidity: number
      [key: string]: unknown
    }
    sys: {
      sunrise: number
      sunset: number
      [key: string]: unknown
    }
    dt: number
    timezone: number
    [key: string]: unknown
  }

  const [data, setData] = useState<WeatherData | null>(null)

  const [forcast, setForcast] = useState<ForecastItem[]>([])
  const [city, setCity] = useState<string>('')
  const [city1, setCity1] = useState<string>('')
  const [hum, setHum] = useState<string>('')
  const [time, setTime] = useState<
    { sunrise: string; sunset: string; clock?: string }[]
  >([])
  const [utc, setUtc] = useState<number | undefined>()
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  const handleCity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCity1(city)
    setCity('')
  }

  useEffect(() => {
    if (city1 !== '') {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city1}&appid=51e3c7dccef6c1c50ca23cabe24387b9&units=metric`
        )
        .then((response) => {
          setForcast(response.data.list)
        })

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city1}&lang=EN&appid=7a0ae4dba8a796a5da6b7d5ebc3195f3&units=metric`
        )
        .then((response) => {
          setData(response.data)
          setCity1('')
          setTime([
            {
              sunset: new Date(
                response.data.sys.sunset * 1000
              ).toLocaleTimeString(),
              sunrise: '',
            },
            {
              sunrise: new Date(
                response.data.sys.sunrise * 1000
              ).toLocaleTimeString(),
              sunset: '',
            },
            {
              clock: new Date(response.data.dt * 1000).toLocaleTimeString(),
              sunrise: '',
              sunset: '',
            },
          ])
          setHum(response.data.main.humidity)
          setUtc(response.data.timezone / 3600)
        })
        .catch(console.error)
    }

    const intervalId = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
    return () => clearInterval(intervalId)
  }, [city1])

  return (
    <>
      <CityForm city={city} setCity={setCity} handleCity={handleCity} />
      {data && (
        <>
          <div className='lg:flex flex-row lg:w-100 lg:mx-32'>
            <WeatherCard
              data={data}
              time={time}
              hum={hum}
              utc={utc}
              currentDate={currentDate}
            />
            <WeatherDetails
              time={time}
              hum={hum}
              pressure={data.main.pressure}
            />
          </div>
          <Forecast data={forcast} />
        </>
      )}
    </>
  )
}

export default App
