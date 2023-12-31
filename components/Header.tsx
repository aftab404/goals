'use client'

import fetchSuggestion from '@/lib/fetchSuggestion'
import { useBoardStore } from '@/store/BoardStore'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Avatar from 'react-avatar'

export const Header = () => {

    const [board, searchString, setSearchString] = useBoardStore(state => [state.board, state.searchString, state.setSearchString])

    const [loading, setLoading] = useState<boolean>(false)
    const [suggestion , setSuggestion] = useState<string>("")

    useEffect(() => {
        if(board.columns.size === 0) return;
        setLoading(true)

        const helper = async () => {
            const suggestion = await fetchSuggestion(board)
            setSuggestion(suggestion)
            setLoading(false)
        }

        helper()
    }, [board])

    return (
        <header>

            <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl'>

                <div className='absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-sky-400 rounded-md filter blur-3xl opacity-50 -z-50'>

                </div>

                <Image
                    src="https://links.papareact.com/c2cdd5"
                    alt='Logo'
                    width={300}
                    height={100}
                    className="w-44 md:w56 pb-10 md:pb-0 object-contain"
                />

                <div className='flex items-center space-x-5 flex-1 justify-end w-full'>
                    <form action="" className='flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial'>
                        <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
                        <input
                            type="text"
                            placeholder='Search'
                            className='flex-1 focus:outline-none p-2'
                            onChange={(e) => setSearchString(e.target.value)}
                        />

                        <button type='submit'>Search</button>
                    </form>

                    <Avatar 
                        name='Aftab'
                        round
                        size='50'/>
                </div>
            </div>

            <div className='flex items-center justify-center px-5 md:py-5'>
                <p className='flex items-center text-sm font-light pr-5 shadow-xl p-5 rounded-xl w-fit bg-white max-w-3xl text-sky-400'>
                    <UserCircleIcon className={`inline-block h-10 w-10 text-sky-500 mr-1 ${loading && "animate-spin"}`}/>
                    {
                        suggestion && !loading ? suggestion : " GPT is summarising your goals for the day..."
                    }
                </p>
            </div>

        </header>
    )
}
