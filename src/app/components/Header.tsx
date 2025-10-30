import SearchBar from './SearchBar';

export default function Header({
  onSubmit,
}: {
  onSubmit: (city: string) => void;
}) {
  return (
    <div className='flex flex-col md:flex-row items-center gap-5'>
      <h1 className='font-bold text-2xl md:text-3xl md:mr-9'>Sunbuddy</h1>
      <SearchBar onSubmit={onSubmit} />
    </div>
  );
}
