import React from 'react'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  time: { sunrise: string; sunset: string; clock?: string }[]
  hum: string
  utc?: number
  currentDate: Date
}

const WeatherCard: React.FC<Props> = ({ data, utc = 0, currentDate }) => {
  const formatTime = (n: number) => (n < 10 ? `0${n}` : n)
  const hours = formatTime(currentDate.getHours())
  const minutes = formatTime(currentDate.getMinutes())
  const seconds = formatTime(currentDate.getSeconds())

  return (
    <div className='w-full py-6 px-8 mx-8 mt-12 flex flex-col gap-2 rounded-lg shadow-lg bg-slate-800'>
      <div className='flex justify-between'>
        <div className='flex-col flex justify-start gap-3'>
          <p className='text-xl'>{data.name}</p>
          <p className='text-lg'>{data.weather[0].description}</p>
        </div>
        <div>
          <span className='text-white font-extrabold'>
            {Number(hours) + utc - 1}:{minutes}:{seconds}
          </span>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt='weather icon'
          />
        </div>
      </div>
      <p>Temperature: {parseFloat(parseInt(data.main.temp).toFixed(2))} C°</p>
    </div>
  )
}

export default WeatherCard
