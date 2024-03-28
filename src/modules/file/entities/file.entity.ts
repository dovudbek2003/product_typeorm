import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('files')
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: false })
    location: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    name: string;

    @Column({ type: 'text', nullable: false })
    mimetype: string;

    @Column({ type: 'int', nullable: false })
    size: number;
}
