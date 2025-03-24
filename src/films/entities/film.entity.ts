import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { Character } from './character.entity';
import { Planet } from './planet.entity';
import { Starship } from './starship.entity';
import { Vehicle } from './vehicle.entity';
import { Species } from './species.entity';

@Entity()
export class Film {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    url: string;

    @Column()
    episode_id: number;

    @Column('text')
    opening_crawl: string;

    @Column()
    director: string;

    @Column()
    producer: string;

    @Column()
    release_date: Date;

    @Column()
    created: Date;

    @Column()
    edited: Date;

    @ManyToMany(() => Character, character => character.films)
    @JoinTable()
    characters: Character[];

    @ManyToMany(() => Planet, planet => planet.films)
    @JoinTable()
    planets: Planet[];

    @ManyToMany(() => Starship, starship => starship.films)
    @JoinTable()
    starships: Starship[];

    @ManyToMany(() => Vehicle, vehicle => vehicle.films)
    @JoinTable()
    vehicles: Vehicle[];

    @ManyToMany(() => Species, species => species.films)
    @JoinTable()
    species: Species[];
}