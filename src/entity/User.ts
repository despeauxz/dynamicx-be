import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id;

    @Column({ type: "varchar", nullable: false, unique: true })
    username;

    @Column({ type: "varchar", nullable: false, unique: true })
    email;

    @Column({ type: "varchar", nullable: false })
    password;

    @CreateDateColumn()
    created_at: Date;
        
    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
