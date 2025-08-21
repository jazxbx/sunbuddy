'use client';

type SearchProps = {
  placeholder: string;
  city: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function SearchBar({
  placeholder,
  city,
  onChange,
  onSubmit,
}: SearchProps) {
  return (
    <div className='p-6'>
      <form className='flex gap-2 w-full max-w-md' onSubmit={onSubmit}>
        <input
          type='text'
          value={city}
          onChange={onChange}
          placeholder={placeholder}
          className='flex-1 px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        <button
          type='submit'
          className='px-4 py-2 bg-blue-400 text-white rounded-xl hover:bg-blue-600'
        >
          Search
        </button>
      </form>
    </div>
  );
}
