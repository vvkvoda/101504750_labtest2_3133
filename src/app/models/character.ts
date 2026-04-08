export interface Wand {
  wood: string;
  core: string;
  length: number | null;
}

export interface Character {
  id: string;
  name: string;
  house: string;
  image: string;
  species: string;
  wizard: boolean;
  ancestry: string;
  actor: string;
  dateOfBirth?: string;
  gender?: string;
  eyeColour?: string;
  hairColour?: string;
  patronus?: string;
  alive?: boolean;
  alternate_names?: string[];
  wand: Wand;
}
