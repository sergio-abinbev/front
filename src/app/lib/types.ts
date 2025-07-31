export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  docNumber: string; 
  phoneNumbers: string[];
  managerName?: string; 
  password?: string; 
  dateOfBirth: string; 
  isActive?: boolean;
}

export interface AuthResponse {
  token: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  errors?: string[];
}

export type UserRole = 'employee' | 'leader' | 'director';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any;
}

export interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  [key: string]: any;
}
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hasError?: boolean; 
}