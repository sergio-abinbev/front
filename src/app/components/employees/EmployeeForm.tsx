'use client';

import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Employee } from '../../lib/types';
import styles from './_employee-form.module.scss';

interface EmployeeFormProps {
  onSubmit: (formData: Omit<Employee, 'id'>) => Promise<void>;
  initialData?: Employee;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit, initialData = {} as Employee }) => {
  const [formData, setFormData] = useState<Omit<Employee, 'id' | 'isActive'>>({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    docNumber: initialData.docNumber || '',
    phoneNumbers: initialData.phoneNumbers || [''],
    managerName: initialData.managerName || '',
    dateOfBirth: initialData.dateOfBirth || '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhoneNumbers = [...formData.phoneNumbers];
    newPhoneNumbers[index] = value;
    setFormData((prev) => ({ ...prev, phoneNumbers: newPhoneNumbers }));
  };

  const addPhoneNumber = () => {
    setFormData((prev) => ({ ...prev, phoneNumbers: [...prev.phoneNumbers, ''] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.docNumber || !formData.dateOfBirth) {
        setError('Todos os campos obrigatórios devem ser preenchidos.');
        return;
      }
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      if (age < 18) {
        setError('O funcionário deve ser maior de idade.');
        return;
      }

      await onSubmit(formData);
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar funcionário.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <form onSubmit={handleSubmit} className={styles['employee-form']}>
      {error && <p className={styles['employee-form__error']}>{error}</p>}
      <Input
        label="Primeiro Nome"
        placeholder="Primeiro Nome"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        onBlur={(e)=>console.log({e})}
        required
        />
      <Input
        label="Sobrenome"
        placeholder="Sobrenome"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
        />
      <Input
        label="Email"
        placeholder="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        />
      <Input
        label="Número do Documento"
        placeholder="Número do Documento"
        name="docNumber"
        value={formData.docNumber}
        onChange={handleChange}
        required
        />
      <Input
        label="Data de Nascimento"
        placeholder="Data de Nascimento"
        name="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={handleChange}
        required
        />
      <div className={styles['employee-form__phones']}>
        {formData.phoneNumbers.map((phone, index) => (
          <Input
            label='Phone'
            key={index}
            name={`phone-${index}`}
            value={phone}
            onChange={(e: { target: { value: string; }; }) => handlePhoneChange(index, e.target.value)}
            type="tel"
            placeholder="Ex: (XX) XXXXX-XXXX"
          />
        ))}
        <Button type="button" onClick={addPhoneNumber} variant="secondary">
          Adicionar Telefone
        </Button>
      </div>

      <Input
        label="Nome do Gerente"
        placeholder="Nome do Gerente"
        name="managerName"
        value={formData.managerName || ''}
        onChange={handleChange}
      />
      <Input
        label="Senha"
        placeholder="Senha"
        name="password"
        type="password"
        value={formData.password || ''}
        onChange={handleChange}
        required={!initialData.id}
      />

      <Button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar Funcionário'}
      </Button>
    </form>
  );
};

export default EmployeeForm;