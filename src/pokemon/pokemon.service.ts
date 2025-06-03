import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
// DTO
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    public readonly model: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.getOrThrow<number>('default_limit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon: Pokemon = await this.model.create(createPokemonDto);

      return pokemon;
    } catch (error) {
      this._handleUncontrolledExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    return this.model
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 'asc' })
      .select('-__v');
  }

  async findOne(field: string): Promise<Pokemon> {
    let pokemon: Pokemon | null = null;

    // Pokemon number
    if (!isNaN(+field)) {
      pokemon = await this.model.findOne({ no: field });
    }
    // MongoID
    if (!pokemon && isValidObjectId(field)) {
      pokemon = await this.model.findById(field);
    }
    // Name
    if (!pokemon) {
      pokemon = await this.model.findOne({
        name: field.toLowerCase().trim(),
      });
    }

    if (!pokemon)
      throw new NotFoundException(
        `[ERROR]: Pokemon with id, name or number: "${field}" not found`,
      );

    return pokemon;
  }

  async update(field: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon: Pokemon = await this.findOne(field);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this._handleUncontrolledExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.model.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id '${id}' not found.`);
  }

  private _handleUncontrolledExceptions(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === 11000) {
      throw new BadRequestException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `[ERROR]: Pokemon already exists in db as ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `[ERROR]: Cannot perform action. Review server logs.`,
    );
  }
}
