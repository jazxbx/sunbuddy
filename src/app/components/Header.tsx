import SearchBar from './SearchBar';

export default function Header({
  onSubmit,
}: {
  onSubmit: (city: string) => void;
}) {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between'>
      <div>Sunbuddy</div>
      <SearchBar onSubmit={onSubmit} />
    </div>
  );
}
