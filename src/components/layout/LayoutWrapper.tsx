'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <div className="md:ml-[260px] min-h-screen transition-all duration-300">
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </>
  );
}
