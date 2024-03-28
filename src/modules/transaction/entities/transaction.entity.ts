import { Product } from "src/modules/product/entities/product.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    count: number;

    @Column({ name: 'total_price', type: 'int', nullable: false })
    totalPrice: number;

    /** @JoinColumn yozilmas user keyiga camelCase da userId yozib ketiladi */
    @ManyToOne(
        type => User,
        (user) => user.id,
        {
            onDelete: 'SET NULL',
            nullable: true
        }
    )
    @JoinColumn({ name: 'created_by' })
    createdBy: User

    @ManyToOne(
        type => User,
        (user) => user.id,
        {
            onDelete: 'SET NULL',
            nullable: true
        }
    )
    @JoinColumn({ name: 'last_edited_by' })
    lastEditedBy: User

    @ManyToOne(
        type => User,
        (user) => user.id,
        {
            onDelete: 'SET NULL',
            nullable: true
        }
    )
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(
        type => Product,
        (product) => product.transactions,
        {
            onDelete: 'SET NULL',
            nullable: true
        }
    )
    @JoinColumn({ name: 'product_id' })
    product: Product
}
