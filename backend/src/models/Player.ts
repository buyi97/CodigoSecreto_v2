export type Team = 'red' | 'blue';
export type Role = 'spymaster' | 'operative';

export interface Player {
  id: string;
  name: string;
  team: Team | null;
  role: Role | null;
  isAdmin: boolean;
  isConnected: boolean;
}