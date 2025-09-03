"use client"; 

// app/page.tsx
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige">
      
      <div className="mb-12">
        <Image src="/ganso.png" alt="Ganso Bebida" width={200} height={200} />
      </div>

      
      <div className="flex flex-col gap-4 w-64">
        <button
          className="bg-gray-800 text-white py-3 rounded-md font-semibold hover:bg-gray-700"
          onClick={() => router.push('/loginLoja')}
        >
          Minha lojaaa
        </button>
        <button
          className="border border-gray-800 text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-100"
          onClick={() => router.push('/loginCliente')}
        >
          Sou cliente
        </button>
      </div>
    </div>
  );
}
