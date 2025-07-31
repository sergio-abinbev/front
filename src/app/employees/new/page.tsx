'use client'; 
import React from 'react';
import styles from '../_employee-new.module.scss';
import EmployeeForm from '@/components/employees/EmployeeForm';
import { Employee } from '@/lib/types';

const NewEmployeePage: React.FC = () => {
  const handleSubmit = async (
    data: Omit<Employee, 'id'>
  ) => {
    console.log('Dados do formulário:', data);
  };

  return (
    <div className={styles['employee-new']}>
      <h1 className={styles['employee-new__title']}>Cadastrar Novo Funcionário</h1>
      <EmployeeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewEmployeePage;