import axios from 'axios'
import { useEffect, useState } from 'react'
import './index.css'
import CityForm from './components/CityForm'
import WeatherCard from './components/WeatherCard'
import WeatherDetails from './components/WeatherDetails'
import Forecast from './components/Forecast'
import type { ForecastItem } from './components/Forecast'

function App() {
  useEffect(() => {
    const savedCity = localStorage.getItem('lastCity')
    const savedWeather = localStorage.getItem('weatherData')
    const savedForecast = localStorage.getItem('forecastData')

    if (savedCity) setCity1(savedCity)
    if (savedWeather) setData(JSON.parse(savedWeather))
    if (savedForecast) setForcast(JSON.parse(savedForecast))
  }, [])
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
          localStorage.setItem(
            'forecastData',
            JSON.stringify(response.data.list)
          )
        })

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city1}&lang=EN&appid=7a0ae4dba8a796a5da6b7d5ebc3195f3&units=metric`
        )
        .then((response) => {
          setData(response.data)
          localStorage.setItem('weatherData', JSON.stringify(response.data))
          localStorage.setItem('lastCity', city1)
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
    <div className='w-screen h-screen  text-black flex flex-col items-center'>
      <CityForm city={city} setCity={setCity} handleCity={handleCity} />
      {data && (
        <>
          <div className='text-white justify lg:flex lg:flex-row lg:w-100 lg:mx-32'>
            <WeatherCard
              data={data}
              time={time}
              hum={hum}
              utc={utc}
              currentDate={currentDate}
            />
          </div>
          <div className='text-white justify lg:flex lg:flex-row lg:w-100 lg:mx-32'>
            <WeatherDetails
              time={time}
              hum={hum}
              pressure={data.main.pressure}
            />
          </div>
          <div className='text-white justify lg:flex lg:flex-row lg:w-100 lg:mx-32'>
            <Forecast data={forcast} />
          </div>
        </>
      )}
    </div>
  )
}

export default App
