// Shared data structures for leagues and draft settings

export type UserID = string;
export type LeagueID = string;
export type GolferID = string;

export interface LeagueSettings {
    name: string;
    owner: UserID;
    maxPlayers: number; // 2..24
    draftOrderThisWeek: UserID[]; // snake order for current week
    draftHistory?: DraftRound[]; // record of past drafts
    scoring: ScoringSettings;
    goldenGolferUsed?: boolean;
}

export interface League {
    id: LeagueID;
    settings: LeagueSettings;
    members: UserID[];
}

export interface DraftRound {
    round: number;
    picks: DraftPick[];
}

export interface DraftPick {
    user: UserID;
    golfer: GolferID;
    timestamp: number;
}

export interface ScoringSettings {
    doubleMajors: boolean; // majors + Players Championship worth double
    allowLIV: boolean; // LIV golfers eligible
    pointValues: { [position: number]: number }; // e.g. {1:350,2:100,3:50}
}

// rules enumerations for reference
export enum DraftRule {
    SnakeOrder = 'snake-order',
    AutoPass = 'auto-pass',
    NoRepeatGolfer = 'no-repeat-golfer',
}

// point calculation helpers
export function calculateWeekPoints(prizeMoney: number, madeCut: boolean): number {
    if (!madeCut) return 0;
    return prizeMoney;
}

