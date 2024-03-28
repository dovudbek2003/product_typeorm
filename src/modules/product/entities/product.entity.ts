import { Category } from "src/modules/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CreateProductDto } from "../dto/create-product.dto";
import { Transaction } from "src/modules/transaction/entities/transaction.entity";
import { User } from "src/modules/user/entities/user.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 256, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 256, nullable: false })
    description: string;

    @Column({ type: 'int', nullable: true, default: 0 })
    price: number;

    @Column({ type: 'int', nullable: true, default: 0 })
    count: number;

    @ManyToOne(() => User, (user) => user.id, {
        onDelete: 'SET NULL',
        nullable: true,
    })
    @JoinColumn({ name: 'created_by' })
    createdBy: User;

    @ManyToOne(() => User, (user) => user.id, {
        onDelete: 'SET NULL',
        nullable: true,
    })
    @JoinColumn({ name: 'last_edited_by' })
    lastEditedBy: User;

    @ManyToOne(
        type => Category,
        (category) => category.products,
        { onDelete: 'SET NULL' }
    )
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(
        type => Transaction,
        (transaction) => transaction.product
    )
    transactions: Array<Transaction>
}
