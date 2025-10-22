export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-white rounded-3xl p-5 border-gray-300'>{children}</div>
  );
}
