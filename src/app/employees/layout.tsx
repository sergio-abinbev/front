import React from 'react';

interface EmployeesRootLayoutProps {
  children: React.ReactNode;
}

export default function EmployeesRootLayout({ children }: EmployeesRootLayoutProps) {
  return (
    <div style={{ padding: 'vars.$spacing-lg', maxWidth: '1200px', margin: '0 auto' }}>
      {children}
    </div>
  );
}