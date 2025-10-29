export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className='bg-white rounded-3xl p-5 border-gray-300  min-w-[200px] 
        min-h-[200px] '
    >
      {children}
    </div>
  );
}
