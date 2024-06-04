export type PlayerGetSchema = {
    username: string,
    surname: string,
    nickname: string,
    rank: string,
    character_id: number,
    user_id: number
}

export type GameGetSchema = {
    game_id: number,
    user_id: number,
    name: string,
    description: string,
    max_players_number: number,
    state: string,
    difficulty: string,
    scenario: string,
    maps: [
      {
        map_id: number,
        game_id: number
      }
    ]
}

export type ItemGetSchema =   {
    item_id: number,
    name: string,
    description: string
  }