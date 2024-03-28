import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { Product } from "src/modules/product/entities/product.entity";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 36, unique: true, nullable: false })
    name: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'last_update_at', type: 'timestamp', nullable: false })
    lastUpdateAt: Date;

    @OneToMany(
        type => Product,
        (product) => product.category
    )
    products: Array<Product>

    // constructor(dto: CreateCategoryDto) {
    //     // this.name
    //     dto.name
    // }
}
