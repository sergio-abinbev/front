import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './Header';
import userEvent from '@testing-library/user-event';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {

    return <img {...props} />;
  },
}));

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'Link';

  return MockLink;
});

function getLinks() {
  const logoLink = screen.getByRole('link', { name: /abinbev logo/i });
  const listEmployeesLink = screen.getByRole('link', { name: /listar funcionários/i });
  const registerEmployeeLink = screen.getByRole('link', { name: /cadastrar funcionário/i });

  return {
    logoLink,
    listEmployeesLink,
    registerEmployeeLink
  }
}

describe('Header', () => {
  test('renders the logo image', () => {
    render(<Header />);

    const logoImage = screen.getByAltText(/abinbev logo/i);
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/abinbev-logo.svg');
  });

  test('renders navigation links', () => {
    render(<Header />);
    const { listEmployeesLink, registerEmployeeLink } = getLinks()

    expect(listEmployeesLink).toBeInTheDocument();
    expect(listEmployeesLink).toHaveAttribute('href', '/employees');

    expect(registerEmployeeLink).toBeInTheDocument();
    expect(registerEmployeeLink).toHaveAttribute('href', '/employees/new');
  });

  test('renders the search input field', () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText(/search.../i);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'search');
  });

  test('renders header with correct structure', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByAltText('ABInBev Logo')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });


  test('navigation links have correct href attributes', () => {
    render(<Header />);
    const { listEmployeesLink, registerEmployeeLink } = getLinks()


    expect(listEmployeesLink).toHaveAttribute('href', '/employees');
    expect(registerEmployeeLink).toHaveAttribute('href', '/employees/new');
  });


  test('logo links to home page', () => {
    render(<Header />);
    const { logoLink } = getLinks()

    expect(logoLink).toHaveAttribute('href', '/');
  });


  test('logo has proper accessibility attributes', () => {
    render(<Header />);

    const logoImage = screen.getByAltText('ABInBev Logo');
    expect(logoImage).toHaveAttribute('src', '/abinbev-logo.svg');
    expect(logoImage).toHaveAttribute('width', '120');
    expect(logoImage).toHaveAttribute('height', '40');
  });

  test('search input accepts user input', async () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText('Search...');

    await userEvent.type(searchInput, 'João Silva');
    expect(searchInput).toHaveValue('João Silva');

    await userEvent.clear(searchInput);
    expect(searchInput).toHaveValue('');
  });

  test('search input has correct attributes', () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toHaveAttribute('type', 'search');
    expect(searchInput).toHaveClass('main-header__search-input');
  });

  test('all navigation items are visible', () => {
    render(<Header />);

    const navItems = screen.getAllByRole('listitem');
    expect(navItems).toHaveLength(2);

    navItems.forEach(item => {
      expect(item).toBeVisible();
    });
  });

  test('search input responds to Enter key', async () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'test search');
    await userEvent.keyboard('{Enter}');

    expect(searchInput).toHaveValue('test search');
  });


  test('navigation links have descriptive text', () => {
    render(<Header />);

    expect(screen.getByText('Listar Funcionários')).toBeInTheDocument();
    expect(screen.getByText('Cadastrar Funcionário')).toBeInTheDocument();
  });


  test('renders with clean initial state', () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toHaveValue('');
    expect(searchInput).not.toHaveFocus();
  });


  test('renders consistently on multiple renders', () => {
    const { rerender } = render(<Header />);

    expect(screen.getByAltText('ABInBev Logo')).toBeInTheDocument();

    rerender(<Header />);

    expect(screen.getByAltText('ABInBev Logo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });


  test('renders without external dependencies', () => {

    expect(() => render(<Header />)).not.toThrow();
  });
});