export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className='    bg-white rounded-3xl p-5 border border-gray-100 
        w-full h-full flex flex-col'
    >
      {children}
    </div>
  );
}
