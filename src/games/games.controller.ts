import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @UsePipes(new ValidationPipe({whitelist: true}))
  @Post()
  async createGame(@Body() createGameDto: CreateGameDto) {
    return await this.gamesService.create(createGameDto);
  }

  @Get()
  async findAllGames() {
    return await this.gamesService.findAll();
  }

  @Get('/FindOne/:id')
  async findOneGame(@Param('id', ParseIntPipe) id: number) {
    return await this.gamesService.findById(id);
  }

  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put('/Update/:id')
  async updateGame(@Param('id', ParseIntPipe) id: number, @Body() gameDto: CreateGameDto) {
    return await this.gamesService.update(id, gameDto);
  }

  @UsePipes(new ValidationPipe({whitelist: true}))
  @Delete('/Remove/:id')
  async removeGame(@Param('id', ParseIntPipe) id: number) {
    return await this.gamesService.remove(id);
  }

  @Delete('/Delete/:id')
  async removePermanentlyGame(@Param('id', ParseIntPipe) id: number) {
    return await this.gamesService.removePermanently(id);
  }
}
