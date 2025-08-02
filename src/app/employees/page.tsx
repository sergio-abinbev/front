
import React from 'react';
import styles from './_employees-page.module.scss'; 
import Link from 'next/link';
import Button from '@/components/ui/Button'; 
import { EmployeeList } from '@/components/employees/EmployeeList';

export const metadata = {
  title: 'Listar Funcionários',
  description: 'Página de listagem de funcionários.',
};

const EmployeesListPage: React.FC = () => {
  
  return (
    <div className={styles['employees-page']}>
      <h1 className={styles['employees-page__title']}>Listagem de Funcionários</h1>
      
      <div className={styles['employees-page__actions']}>
        <Link href="/employees/new">
          <Button variant="primary">Cadastrar Novo Funcionário</Button>
        </Link>
      </div>

      <EmployeeList />
    </div>
  );
};

export default EmployeesListPage;