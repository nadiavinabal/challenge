import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./character.entity";
import { Film } from "./film.entity";

@Entity()
export class Planet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    rotation_period: string;

    @Column()
    orbital_period: string;

    @Column()
    diameter: string;

    @Column()
    climate: string;

    @Column()
    gravity: string;

    @Column()
    terrain: string;

    @Column()
    surface_water: string;

    @Column()
    population: string;

    @Column()
    url: string;

    @Column()
    created: Date;

    @Column()
    edited: Date;

    @ManyToMany(() => Film, film => film.planets)
    films: Film[];
}