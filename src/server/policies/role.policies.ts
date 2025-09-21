export type Role = 'TEACHER' | 'LEADER' | 'CENTRAL';
export type Subrole =
  | 'YEAR_COORD'
  | 'INCLUSION'
  | 'PRINCIPAL'
  | 'SCHOOL_ADMIN'
  | 'DISTRICT_ADMIN'
  | 'CEO';

export type Scope = {
  classIds?: string[];
  yearLevels?: string[];
  schoolIds?: string[];
  regionIds?: string[];
};

export type UserClaims = {
  userId: string;
  role: Role;
  subroles: Subrole[];
  scope: Scope;
  permissions: string[];
};
