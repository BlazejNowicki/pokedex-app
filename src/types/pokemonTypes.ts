export interface PokemonModel {
    id: number,
    name: string,
    types: string[],
    sprite: string,
    weight: number,
    height: number
}

export interface PokemonApiModel {
    id: number,
    name: string,
    types: {
        type: {
            name: string,
        }
    }[],
    sprites: {
        other: {
            "official-artwork": {
                front_default: string
            }
        },
    },
    weight: number,
    height: number,
}

export const mapApiModel = (apiModel: PokemonApiModel): PokemonModel => {
    return {
        id: apiModel.id,
        name: apiModel.name,
        types: apiModel.types.map(type => type.type.name),
        weight: apiModel.weight,
        height: apiModel.height,
        sprite: apiModel.sprites.other["official-artwork"].front_default,
    };
}