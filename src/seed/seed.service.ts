import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
// import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  private pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=650';

  constructor(
    private readonly http: HttpService,
    private readonly pokemonService: PokemonService,
    // private readonly customHttp: AxiosAdapter,
  ) {}

  async populateDatabase() {
    // Delete all from the Pokemon table
    await this.pokemonService.pokemonModel.deleteMany({});

    const { data } = await this.http.axiosRef.get<PokeResponse>(
      this.pokeApiUrl,
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    for (const { name, url } of data.results) {
      const segments: string[] = url.split('/');
      const no: number = +segments[segments.length - 2];

      pokemonToInsert.push({ name, no });
    }
    // Insert pokemons inside MongoDB
    await this.pokemonService.pokemonModel.insertMany(pokemonToInsert);

    return `Seed executed successfully! ✅`;
  }

  // async populateDatabase() {
  //   // Delete all from the Pokemon table
  //   await this.pokemonService.removeAll();

  //   const { data } = await this.http.axiosRef.get<PokeResponse>(
  //     this.pokeApiUrl,
  //   );

  //   const promisesArray: Promise<any>[] = [];

  //   for (const { name, url } of data.results) {
  //     const segments: string[] = url.split('/');
  //     const no: number = +segments[segments.length - 2];

  //     promisesArray.push(this.pokemonService.create({ name, no }));
  //     // await this.pokemonService.create({ name, no });
  //   }

  //   await Promise.all(promisesArray);

  //   return `Seed executed successfully! ✅`;
  // }
}
