import React from 'react'

interface Props {
  time: { sunrise: string; sunset: string }[]
  hum: string
  pressure: number
}

const WeatherDetails: React.FC<Props> = ({ time, hum, pressure }) => {
  const progressBarStyle: React.CSSProperties = {
    height: '100%',
    backgroundColor: '#0440f0',
    width: `${hum}%`,
    borderRadius: '8px',
    color: '#ffffff',
    padding: '0 1rem',
  }

  return (
    <div
      className='w-100 py-6 px-8 mx-4 items-center
          h-auto mt-12 justify-center flex flex-col  gap-2  rounded-lg shadow-lg bg-slate-800'
    >
      <p>Sunrise: {time[1]?.sunrise}</p>
      <p>Sunset: {time[0]?.sunset}</p>
      <div className='w-80 h-6 bg-slate-400 rounded-xl'>
        <div style={progressBarStyle}>Humidity {hum}%</div>
      </div>
      <p>Pressure: {pressure}mb</p>
    </div>
  )
}

export default WeatherDetails
