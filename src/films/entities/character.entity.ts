import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Planet } from "./planet.entity";
import { Film } from "./film.entity";
import { Vehicle } from "./vehicle.entity";
import { Starship } from "./starship.entity";

@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    height: string;

    @Column()
    mass: string;

    @Column()
    hair_color: string;

    @Column()
    skin_color: string;

    @Column()
    eye_color: string;

    @Column()
    birth_year: string;

    @Column()
    gender: string;

    @Column()
    url: string;

    @Column()
    created: Date;

    @Column()
    edited: Date;
   /* @ManyToOne(() => Planet, planet => planet.residents)
    homeworld: Planet; */

    @ManyToMany(() => Film, film => film.characters)
    films: Film[];

    @ManyToMany(() => Vehicle, vehicle => vehicle.pilots)
    vehicles: Vehicle[];

    @ManyToMany(() => Starship, starship => starship.pilots)
    starships: Starship[];
}