'use client';

import { useState } from 'react';

// create state here for input then a handler to

type SearchProps = {
  onSubmit: (input: string) => void;
};

export default function SearchBar({ onSubmit }: SearchProps) {
  const [input, setInput] = useState('');

  const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) {
      console.log('no input/ not valid');
      return;
    }
    onSubmit(value);
    setInput('');
  };

  return (
    <div className='py-3 md:py-5'>
      <form className='flex gap-2 w-full max-w-md' onSubmit={handleInput}>
        <div className='flex items-center border-2 rounded-3xl bg-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            className='size-6 ml-4'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
            />
          </svg>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput((e.target as HTMLInputElement).value)}
            placeholder='Search City...'
            className='flex-1 px-4 py-2 border-none rounded-xl focus:outline-none'
          />
        </div>

        {/* <button
          type='submit'
          className='border-2 border-blue-800 pointer px-4 py-2 bg-blue-400 text-white rounded-xl hover:bg-blue-600'
        >
          Search
        </button> */}
      </form>
    </div>
  );
}
