import { UserButton } from '@clerk/nextjs';
import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen  w-screen relative flex">
      <aside className=" basis-1/6 h-full border-r bg-slate-100 drop-shadow-sm w-full">
        <div className="px-4 my-4">
          <span className="text-3xl">JOURNALS</span>
        </div>
      </aside>
      <section className="basis-5/6 h-full bg-slate-100 w-full">
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
