import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <>
      <header className="pt-4 fixed left-0 top-0 z-50 w-full translate-y-[-1rem] animate-fade-in border-b border-base-200 backdrop-blur-[12px] [--animation-delay:600ms]">
        <div className="container flex h-[3.5rem] items-center justify-between">
          <div className="flex items-center ml-4">
            <Link
              className="flex items-center text-md text-black"
              href="/"
            >
              <Image
                src="/16.svg"
                alt="AI Camp Logo"
                width={48}
                height={48}
                className="w-12 h-12 mr-2"
              />
              <span className="font-semibold text-2xl text-orange-500">AI Camp</span>
            </Link>
          </div>
          <div className="flex-1"></div>
        </div>
      </header>
    </>
  );
}
