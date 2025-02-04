import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameEntity } from './entities/game.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class GamesService {

  constructor(@InjectRepository(GameEntity) private readonly gameRepository: Repository<GameEntity>){}

  //Insert-Add a new game
  async create(gameDto: CreateGameDto): Promise<any> {
    const exists = await this.findByName(gameDto.name);//Get a game by id
    if(exists) throw new BadRequestException(new MessageDto('Game already exists'));//Verify if game already exists
    const game = this.gameRepository.create(gameDto);//Add a new game
    await this.gameRepository.save(game);//Save the game added
    return new MessageDto(`Game ${game.name} added`);
  }

  //Return a games list
  async findAll(): Promise<GameEntity[]> {
    const gamesList = await this.gameRepository.find();//Get all games into a list where status is true

    //Check if the list is empty
    if(!gamesList){
      throw new NotFoundException(new MessageDto('No games found'));
    }
    return gamesList;
  }

  //Return a game by id
  async findById(id: number): Promise<GameEntity> {
    const game = await this.gameRepository.findOneBy({id: id});//Get a game by id

    //Check if the game exists
    if(!game || !game.status){
      throw new NotFoundException(new MessageDto('No game found'));
    }
    return game;
  }

  //Return a game by name
  async findByName(name: string): Promise<any> {
    const game = await this.gameRepository.findOneBy({name: name});//Get a game by name

    //Check if the game exists
    if(!game || !game.status) return false;
    return true;
  }

  //Update a game
  async update(id: number, gameDto: CreateGameDto): Promise<any> {
    const game = await this.findById(id);//Get a game by id
    if(!game || !game.status) throw new NotFoundException(new MessageDto('Game does not exists'));//Verify if game exists or if status is true
    const exists = await this.findByName(gameDto.name);//Get a game by name
    if(exists && exists.id !== id) throw new BadRequestException(new MessageDto('Game already exists'));//Verify a duplicate game name

    //Update changed values
    gameDto.name ? game.name = gameDto.name : game.name = game.name;
    gameDto.description ? game.description = gameDto.description : game.description = game.description;
    gameDto.image ? game.image = gameDto.image : game.image = game.image;
    gameDto.storage ? game.storage = gameDto.storage : game.storage = game.storage;

    await this.gameRepository.save(game);
    return new MessageDto(`Game ${gameDto.name} updated`);
  }

  //Change game status to false
  async remove(id: number): Promise<any> {
    const game = await this.findById(id);//Get a game by id
    if(!game || !game.status) throw new NotFoundException(new MessageDto('Game does not exists'));//Verify if game exists or if status is true

    game.status = false;//Change game status

    await this.gameRepository.save(game);//Update game status

    return new MessageDto(`Game ${game.name} removed`);
  }

  //Delete a game
  async removePermanently(id: number): Promise<any> {
    const game = await this.findById(id);//Get a game by id
    if(!game || !game.status) throw new NotFoundException(new MessageDto('Game does not exists'));//Verify if game exists or if status is true

    await this.gameRepository.delete(game);//Deteled selected game

    return new MessageDto(`Game ${game.name} has been deleted`);
  }
}
