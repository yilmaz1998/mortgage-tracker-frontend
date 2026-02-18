import Link from 'next/link'
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <div className="relative flex items-center justify-center h-screen">
      <div
        className="absolute inset-0 block md:hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/mobile-image.jpg')" }}
      ></div>

      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center"
        style={{ backgroundImage: "url('/image.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 flex flex-col items-center gap-2">
        <h1 className="text-4xl md:text-5xl text-white text-center">
          Mortgage Application
        </h1>
        <p className="text-white/80 text-lg text-center mt-2">
          Start your journey to home ownership today.
        </p>

        <div className="flex gap-2 mt-2">
          <Button>
            <Link href="/mortgage-application">
              Start a New Application
            </Link>
          </Button>
          <Button variant="destructive">
            <Link href="/mortgage-tracker">
              Track Your Application
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default page