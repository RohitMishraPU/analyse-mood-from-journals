import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {

  const links = [
    { name: 'Journals', href: '/journal' },
    { name: 'History', href: '/history' },
    { name: 'Home', href: '/journal' },
  ]

  return (
    <div className="h-screen  w-screen relative flex">
      <aside className=" basis-1/6 h-full border-r bg-slate-100 drop-shadow-sm w-full">
        <div className="px-4 my-4">
          <span className="text-3xl">MOOD</span>
        </div>
        <ul className="px-4">
            {links.map((link) => (
              <li key={link.name} className="text-xl my-4">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
      </aside>
      <section className="basis-5/6 h-full bg-slate-100 w-full flex flex-col">
        <header className="py-4 border-b rounded-b-sm drop-shadow-sm  ">
          <nav className="px-4 h-full">
            <div className="flex items-center justify-end h-full">
              <UserButton />
            </div>
          </nav>
        </header>
        {children}
      </section>
    </div>
  );
};

export default DashboardLayout;
