import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable()
export class SeedService {
  private pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';

  constructor(
    private readonly http: HttpService,
    private readonly pokemonService: PokemonService,
  ) {}

  async populateDatabase() {
    const { data } = await this.http.axiosRef.get<PokeResponse>(
      this.pokeApiUrl,
    );

    for (const { name, url } of data.results) {
      const segments: string[] = url.split('/');
      const no: number = +segments[segments.length - 2];
      await this.pokemonService.create({ name, no });
    }

    return `Seed executed successfully! ✅`;
  }
}
