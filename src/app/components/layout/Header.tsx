'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './_header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles['main-header']}>
      <div className={styles['main-header__container']}>
        
        <div className={styles['main-header__logo']}>
          <Link href="/">
            <Image
              src="/abinbev-logo.svg"
              alt="ABInBev Logo"
              width={120}
              height={40}
            />
          </Link>
        </div>
        <nav className={styles['main-header__nav']}>
          <ul className={styles['main-header__nav-list']}>
            <li className={styles['main-header__nav-item']}>
              <Link href="/employees" className={styles['main-header__nav-link']}>
                Listar Funcionários
              </Link>
            </li>
            <li className={styles['main-header__nav-item']}>
              <Link href="/employees/new" className={styles['main-header__nav-link']}>
                Cadastrar Funcionário
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles['main-header__search']}>
            <input 
                type="search" 
                placeholder="Search..." 
                className={styles['main-header__search-input']} 
            />
        </div>
      </div>
    </header>
  );
};