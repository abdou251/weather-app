import React from 'react'

interface Props {
  city: string
  setCity: React.Dispatch<React.SetStateAction<string>>
  handleCity: (e: React.FormEvent<HTMLFormElement>) => void
}

const CityForm: React.FC<Props> = ({ city, setCity, handleCity }) => (
  <div className='w-full flex justify-center'>
    <form
      onSubmit={handleCity}
      className='flex items-center gap-2 py-4 font-medium'
    >
      <label htmlFor='city'>City</label>
      <input
        className='h-8 m-2 w-48 px-4 rounded-xl shadow-lg border-2 text-black'
        type='text'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className='p-1' type='submit'>
        Submit
      </button>
    </form>
  </div>
)

export default CityForm
