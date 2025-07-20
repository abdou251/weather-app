import React, { useState } from 'react'

interface ForecastItem {
  dt_txt: string
  main: { temp: number }
  weather: { icon: string; main: string }[]
}

interface Props {
  data: ForecastItem[]
}

const Forecast: React.FC<Props> = ({ data }) => {
  const [showForecast, setShowForecast] = useState(false)

  return showForecast ? (
    <div className='w-100 py-6 px-6 mx-8 mt-12 flex flex-col gap-2 rounded-lg shadow-lg bg-slate-800 lg:mx-40'>
      <button className='text-white' onClick={() => setShowForecast(false)}>
        Hide
      </button>
      {data.map((item, index) => (
        <div
          key={index}
          className='flex justify-between items-center p-2 pl-4 bg-slate-500 rounded-lg'
        >
          <div>
            <p>{item.dt_txt}</p>
            <p>{item.main.temp} C°</p>
            <p>{item.weather[0].main}</p>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt='icon'
          />
        </div>
      ))}
    </div>
  ) : (
    <div className='lg:mx-40 w-100 py-6 px-16 mx-8 mt-12 flex flex-col gap-2 rounded-lg shadow-lg bg-slate-800 text-white'>
      <button onClick={() => setShowForecast(true)}>3 hours forecast</button>
    </div>
  )
}

export default Forecast
export type { ForecastItem }
