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
        <input
          type='text'
          value={input}
          onChange={(e) => setInput((e.target as HTMLInputElement).value)}
          placeholder='Search City...'
          className='flex-1 px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        <button
          type='submit'
          className='border-2 border-blue-800 pointer px-4 py-2 bg-blue-400 text-white rounded-xl hover:bg-blue-600'
        >
          Search
        </button>
      </form>
    </div>
  );
}
