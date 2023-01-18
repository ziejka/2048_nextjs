import { useRouter } from 'next/router'
import { useGameLogic } from '../hooks/useGameLogic'
import { FieldComponent } from './FieldComponent'
import React from 'react'
import Link from 'next/link'

const DEFAULT_GRIND_SIZE = 6

type PropTypes = {
  title: string
}
export default function Game({ title }: PropTypes) {
  const router = useRouter()
  if (!router.isReady)
    return <div className="text-center font-bold text-6xl mt-5">Loading...</div>

  const gridSize = router.query?.grid
    ? parseInt(router.query.grid as string)
    : DEFAULT_GRIND_SIZE
  const { onReset, fields, gameOver } = useGameLogic(gridSize)

  return (
    <div className="bg-[#FBF6F3] w-screen h-screen pt-2">
      <h1 className="text-3xl text-slate-900 text-center">{title}</h1>
      <section
        className={`grid grid-cols-${gridSize} grid-rows-${gridSize} relative
        gap-1 border-2 rounded border-blue-50 w-fit mx-auto my-1.5 p-1.5 `}
      >
        {fields.map((f) => (
          <FieldComponent key={f.id} field={f} />
        ))}
        {gameOver && (
          <div
            className="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center text-white bold
           bg-gray-700 bg-opacity-70 rounded-2xl font-bold text-2xl"
          >
            Game Over
          </div>
        )}
      </section>
      <section className="flex justify-center gap-2">
        <Link href="/">
          <button
            className="block mt-6 mx-auto w-auto border border-blue-500 rounded-2xl px-3 py-1
          bg-blue-200 hover:bg-blue-400 active:bg-blue-300 transition-colors duration-200"
          >
            Back
          </button>
        </Link>
        <button
          className="block mt-6 border border-amber-400 rounded-2xl px-3 py-1
          bg-amber-100 hover:bg-amber-200 active:bg-amber-300 transition-colors duration-200"
          onClick={onReset}
        >
          Reset
        </button>
      </section>
    </div>
  )
}
