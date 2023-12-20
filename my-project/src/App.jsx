/* eslint-disable react/prop-types */
import axios from 'axios'
import { useEffect, useState } from 'react'
import './index.css'

function App() {
  const [data, setData] = useState('')
  const [forcast, setForcast] = useState([])
  const [city, setCity] = useState('')
  const [city1, setCity1] = useState('')
  const [hum, setHum] = useState('')
  const [time, setTime] = useState([{}])
  const [utc, setUtc] = useState()
  const [currentDate, setCurrentDate] = useState(new Date())

  const handleCity = (e) => {
    e.preventDefault()
    setCity1(city)
    setCity('')
  }

  const progressBar = {
    height: '100%',
    backgroundColor: '#0440f0',
    width: `${hum}%`,
    borderRadius: '8px',
    color: '#ffffff',
    padding: ' 0 1rem',
  }

  useEffect(() => {
    if (city1 !== '') {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city1}&appid=51e3c7dccef6c1c50ca23cabe24387b9&units=metric`
        )
        .then((response) => {
          setForcast(response.data.list)

          console.log(forcast)
        })
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city1}&lang=EN&appid=7a0ae4dba8a796a5da6b7d5ebc3195f3&units=metric`
        )
        .then((response) => {
          setData(response.data)
          setCity1('')
          console.log(data)
          setTime([
            {
              sunset: new Date(
                response.data.sys.sunset * 1000
              ).toLocaleTimeString(),
            },
            {
              sunrise: new Date(
                response.data.sys.sunrise * 1000
              ).toLocaleTimeString(),
            },
            {
              clock: new Date(response.data.dt * 1000).toLocaleTimeString(),
            },
          ])
          setHum(response.data.main.humidity)
          setUtc(response.data.timezone / 3600)
        })
        .catch((error) => {
          console.error(error)
        })
    }
    const intervalId = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [city1, data])
  const formatTime = (time) => {
    return time < 10 ? '0' + time : time
  }

  const hours = formatTime(currentDate.getHours())
  const minutes = formatTime(currentDate.getMinutes())
  const seconds = formatTime(currentDate.getSeconds())

  return (
    <>
      <div className='w-100 flex justify-center'>
        <form
          onSubmit={handleCity}
          className='flex items-center gap-2 py-4 font-medium'
        >
          <label htmlFor='city'>City </label>
          <input
            className='h-8 m-2 w-48 px-4 rounded-xl shadow-lg border-2 text-black '
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className='p-1' type='submit'>
            Submit
          </button>
        </form>
      </div>

      {data ? (
        <>
          <div className='lg:flex flex-row lg:w-100 lg:mx-32'>
            {' '}
            <div
              className='lg:w-full w-100  py-6 px-8 mx-8
          h-auto mt-12 justify-start flex flex-col gap-2  rounded-lg shadow-lg bg-slate-800 '
            >
              <div className=' flex justify-between'>
                <div className='flex-col flex justify-start gap-3'>
                  <p className='text-xl '>{data.name}</p>
                  <p className='text-lg'>{data.weather[0].description}</p>
                </div>
                <div>
                  {' '}
                  <span className='text-white font-extrabold'>
                    {hours + utc - 1 + ':' + minutes + ':' + seconds}
                  </span>
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt=''
                  />
                </div>
              </div>
              <p>
                Temperature:
                {parseFloat(parseInt(data.main.temp).toFixed(2))} C°
              </p>
            </div>
            <div
              className='lg:w-full w-100 py-6 px-8 mx-8
          h-auto mt-12 justify-start flex flex-col  gap-2  rounded-lg shadow-lg bg-slate-800'
            >
              <p>Sunrise: {time[1].sunrise}</p>
              <p>Sunset: {time[0].sunset}</p>

              <div className='w-100 h-6  bg-slate-400 rounded-xl'>
                <div style={progressBar}>Humidity{hum}%</div>
              </div>
              <p>Pressure: {data.main.pressure}mb</p>
            </div>
          </div>
          <div>
            <Forcast props={forcast} />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  )
}
const Forcast = ({ props }) => {
  const [fiveHours, setFiveHours] = useState(false)
  const showFive = () => {
    setFiveHours(!fiveHours)
  }
  return (
    <>
      {' '}
      {fiveHours ? (
        <div
          className=' w-100 py-6 px-6 mx-8 h-auto mt-12 justify-start flex
          flex-col gap-2 rounded-lg shadow-lg bg-slate-800 lg:mx-40 '
        >
          <button className='text-white' onClick={() => showFive()}>
            hide
          </button>
          {props.map((item, index) => (
            <div
              className='flex justify-between items-center p-2 pl-4 bg-slate-500 rounded-lg'
              key={index}
            >
              <div>
                <p>{item.dt_txt}</p>
                <p>{item.main.temp}C°</p>
                <p>{item.weather[0].main}</p>
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt=''
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className='lg:mx-40 w-100 py-6 px-16 mx-8 h-auto mt-12 justify-end flex
          flex-col gap-2 rounded-lg shadow-lg bg-slate-800 text-white'
        >
          <button onClick={() => showFive()}>3 hours forcast</button>
        </div>
      )}
    </>
  )
}

export default App
