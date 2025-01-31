import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'games'})
export class GameEntity {

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    storage: string;

    @Column({type: 'date'})
    release_date: Date;

    @Column({type: 'boolean', default: true})
    status: boolean;

}
