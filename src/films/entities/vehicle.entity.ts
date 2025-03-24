import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./character.entity";
import { Film } from "./film.entity";

@Entity()
export class Vehicle {
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
    vehicle_class: string;

    @Column()
    url: string;

    @Column()
    created: Date;

    @Column()
    edited: Date;

    @ManyToMany(() => Character, character => character.vehicles)
    pilots: Character[];

    @ManyToMany(() => Film, film => film.vehicles)
    films: Film[];
}