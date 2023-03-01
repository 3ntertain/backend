import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Game } from '../games/game.entity';
import { Setting } from '../settings/setting.entity';
import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pricing } from 'src/pricings/pricing.entity';
import { Happening } from 'src/happenings/happening.entity';
import { awsUrl } from '../common/aws-path';
import { IsOptional } from 'class-validator';

@Entity()
@ObjectType()
export class Mode {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @IsOptional()
  @Field()
  banner: string;

  @IsOptional()
  @Field()
  background: string;

  @Column()
  @Field()
  createApiUrl: string;

  @Column()
  @Field()
  getApiUrl: string;

  @Column()
  @Field()
  active: boolean;

  @Column()
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field({ nullable: true })
  configuration?: string;

  @Column()
  @Field((type) => Int)
  gameId: number;

  @ManyToOne((type) => Game, (game) => game.modes, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Game)
  game: Game;

  @OneToMany((type) => Setting, (setting) => setting.mode)
  @Field((type) => [Setting])
  settings: Setting[];

  @OneToMany((type) => Pricing, (pricing) => pricing.mode)
  @Field((type) => [Pricing])
  pricings: Pricing[];

  @OneToMany((type) => Happening, (happening) => happening.mode)
  @Field((type) => [Happening])
  happenings: Happening[];

  @AfterLoad()
  generateAwsUrls(): void {
    this.banner = awsUrl(`mode-${this.id}-banner`);
    this.background = awsUrl(`mode-${this.id}-background`);
  }
}
