import { User } from "./User";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm"

@Entity("tasks")
export class Task {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 40 })
    title: string;

    @Column({ default: false })
    checked: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User)
    user: User;
}
