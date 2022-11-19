export interface Player {
  id: number;
  height_feet: number;
  height_inches: number;
  weight_pounds: number;
  first_name: string;
  last_name: string;
  position: string;
  team: Team;
}

export interface Team {
  id: number;
  height_feet: number;
  height_inches: number;
  weight_pounds: number;
  full_name: string;
  name: string;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  position: string;
}
