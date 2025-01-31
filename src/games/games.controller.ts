import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @UsePipes(new ValidationPipe({whitelist: true}))
  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    return await this.gamesService.create(createGameDto);
  }

  @Get()
  async findAll() {
    return await this.gamesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.gamesService.findById(id);
  }

  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() gameDto: CreateGameDto) {
    return await this.gamesService.update(id, gameDto);
  }

  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Body() gameDto: CreateGameDto) {
    return await this.gamesService.remove(id);
  }

  @Delete(':id')
  async removePermanently(@Param('id', ParseIntPipe) id: number) {
    return await this.gamesService.removePermanently(id);
  }
}
