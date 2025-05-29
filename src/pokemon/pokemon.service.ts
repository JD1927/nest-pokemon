import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon: Pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 11000) {
        throw new BadRequestException(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `Pokemon already exists in db as ${JSON.stringify(error.keyValue)}`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException(
        `Cannot create Pokemon with name '${createPokemonDto.name}'`,
      );
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(field: string): Promise<Pokemon | null> {
    let pokemon: Pokemon | null = null;

    // Pokemon number
    if (!isNaN(+field)) {
      pokemon = await this.pokemonModel.findOne({ no: field });
    }
    // MongoID
    if (!pokemon && isValidObjectId(field)) {
      pokemon = await this.pokemonModel.findById(field);
    }
    // Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: field.toLowerCase().trim(),
      });
    }

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or number: "${field}" not found`,
      );

    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
