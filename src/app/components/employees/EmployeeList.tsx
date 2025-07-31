import Link from 'next/link';
import Button from '@/components/ui/Button';
import styles from './_employees-list.module.scss';

export function EmployeeList() {
    const employees = [
        { id: 1, firstName: 'João', lastName: 'Silva', email: 'joao.silva@empresa.com' },
        { id: 2, firstName: 'Maria', lastName: 'Souza', email: 'maria.souza@empresa.com' },
        { id: 3, firstName: 'Carlos', lastName: 'Mendes', email: 'carlos.mendes@empresa.com' },
    ];

    return (
        <div className={styles['employees-list']}>

            {employees.length === 0 ? (
                <p className={styles['employees-list__no-data']}>Nenhum funcionário cadastrado ainda.</p>
            ) : (
                <div className={styles['employees-list__grid-container']}> {/* Contêiner principal da "tabela" flexbox */}
                    <div className={styles['employees-list__grid-header']}>
                        <div className={styles['employees-list__grid-header-cell']}>Nome</div>
                        <div className={styles['employees-list__grid-header-cell']}>Sobrenome</div>
                        <div className={styles['employees-list__grid-header-cell']}>E-mail</div>
                        <div className={styles['employees-list__grid-header-cell']}>Ações</div>
                    </div>

                    {employees.map((employee) => (
                        <div key={employee.id} className={styles['employees-list__grid-row']}>
                            <div className={styles['employees-list__grid-cell']} data-label="Nome:">{employee.firstName}</div>
                            <div className={styles['employees-list__grid-cell']} data-label="Sobrenome:">{employee.lastName}</div>
                            <div className={styles['employees-list__grid-cell']} data-label="E-mail:">{employee.email}</div>
                            <div className={styles['employees-list__grid-cell']} data-label="Ações:">
                                <div className={styles['employees-list__row-actions']}>
                                    <Link href={`/employees/edit/${employee.id}`}>
                                        <Button variant="secondary" className={styles['employees-list__action-button']}>Editar</Button>
                                    </Link>
                                    <Button variant="danger" className={styles['employees-list__action-button']}>Excluir</Button> {/* Ação de exclusão simplificada por enquanto */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div >
    )
}