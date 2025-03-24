import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Planet } from "./planet.entity";
import { Film } from "./film.entity";

@Entity()
export class Species {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    classification: string;

    @Column()
    designation: string;

    @Column()
    average_height: string;

    @Column()
    skin_colors: string;

    @Column()
    hair_colors: string;

    @Column()
    eye_colors: string;

    @Column()
    average_lifespan: string;

    @Column()
    url: string;

    @Column()
    created: Date;

    @Column()
    edited: Date;

    @ManyToMany(() => Film, film => film.species)
    films: Film[];
}