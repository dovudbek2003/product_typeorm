import { Role } from "src/common/enums/role.enum";
import { Transaction } from "src/modules/transaction/entities/transaction.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'full_name', type: 'varchar', length: 256, nullable: true })
    fullName: string;

    @Column({ type: 'varchar', length: 256, unique: true, nullable: false })
    login: string;

    @Column({ type: 'text', nullable: false })
    password: string;

    @Column({ type: 'varchar', nullable: false })
    role: Role

    @OneToMany(
        type => Transaction,
        (transaction) => transaction.user
    )
    transactions: Array<Transaction>
}
