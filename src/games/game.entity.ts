import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Mode } from '../modes/mode.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Game {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  symbol: string;

  @Column()
  @Field()
  logo: string;

  @Column()
  @Field()
  banner: string;

  @Column()
  @Field()
  background: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  url: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  twitter?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  discord?: string;

  @OneToMany((type) => Mode, (mode) => mode.game)
  @Field((type) => [Mode])
  modes: Mode[];
}
