import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./character.entity";
import { Film } from "./film.entity";

@Entity()
export class Starship {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    model: string;

    @Column()
    manufacturer: string;

    @Column()
    cost_in_credits: string;

    @Column()
    length: string;

    @Column()
    max_atmosphering_speed: string;

    @Column()
    crew: string;

    @Column()
    passengers: string;

    @Column()
    cargo_capacity: string;

    @Column()
    consumables: string;

    @Column()
    hyperdrive_rating: string;

    @Column()
    MGLT: string;

    @Column()
    starship_class: string;

    @Column()
    url: string;

    @Column()
    created: Date;

    @Column()
    edited: Date;

    @ManyToMany(() => Character, character => character.starships)
    pilots: Character[];

    @ManyToMany(() => Film, film => film.starships)
    films: Film[];
}