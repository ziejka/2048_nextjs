import React, { FormEventHandler, useCallback, useState } from 'react'
import Link from 'next/link'

const MAX_GRID_SIZE = 12
const MIN_GRID_SIZE = 2

export default function Home() {
  const [gridSize, setGridSize] = useState(6)
  const [error, setError] = useState('')

  const handleOnChange: FormEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const value = parseInt(event.currentTarget.value)
      if (Number.isNaN(value) || value < MIN_GRID_SIZE) {
        setError('Grid size must be bigger than 1')
        return
      }
      if (value > MAX_GRID_SIZE) {
        setError('Max grid size is 12')
        return
      }
      setError('')
      setGridSize(value)
    },
    [setGridSize]
  )

  return (
    <div className="bg-[#FBF6F3] w-screen h-screen pt-2 px-4 ">
      <section className="text-slate-500 mx-auto my-0 w-fit">
        <label htmlFor="grid_size">Grid size: </label>
        <input
          type="number"
          id="grid_size"
          name="grid_size"
          onChange={handleOnChange}
          value={gridSize}
          className="w-12 border border-[#1b315b] pl-2 rounded"
        />
      </section>
      {error && <p className="ml-2 text-red-700 text-center">{error}</p>}
      <section className="mt-4 flex justify-center gap-2">
        <Link
          href={{ pathname: '/offline', query: { grid: gridSize } }}
          className="border border-[#a15a1a] bg-[#FEB06A] hover:bg-[#e39854] transition-colors py-2 px-4 rounded-2xl block"
        >
          Play Offline
        </Link>
        <Link
          href={{ pathname: '/online', query: { grid: gridSize } }}
          className="border border-[#1b315b] bg-[#36D6E7] hover:bg-[#17a3b2] transition-colors py-2 px-4 rounded-2xl block"
        >
          Play Online
        </Link>
      </section>
    </div>
  )
}
