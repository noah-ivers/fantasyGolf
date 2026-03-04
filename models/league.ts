// Shared data structures for leagues and draft settings

export type UserID = string;
export type LeagueID = string;
export type GolferID = string;

/** League size: 2–20 players */
export const LEAGUE_MIN_PLAYERS = 2;
export const LEAGUE_MAX_PLAYERS = 20;

export interface ScoringSettings {
    doubleMajors: boolean; // majors + Players Championship worth double
    allowLIV: boolean; // LIV golfers eligible
    pointValues: { [position: number]: number }; // e.g. {1: 350, 2: 100, 3: 50}
}

export interface DraftSettings {
    snakeOrder: boolean; // if true, round 2 order reverses
    pickTimeLimitMinutes: number; // 0 = no limit
    allowGoldenGolfer: boolean; // one-time round-two boost (non-major week)
}

export interface LeagueSettings {
    name: string;
    owner: UserID;
    /** 2–20; number of slots in the league */
    maxPlayers: number;
    draftOrderThisWeek: UserID[]; // snake order for current week
    draftHistory?: DraftRound[]; // record of past drafts
    scoring: ScoringSettings;
    draft: DraftSettings;
    /** Has the league used its one-time Golden Golfer for the current segment (if applicable) */
    goldenGolferUsed?: boolean;
}

export interface League {
    id: LeagueID;
    settings: LeagueSettings;
    members: UserID[];
}

export function isLeaguePlayerCountValid(n: number): boolean {
    return Number.isInteger(n) && n >= LEAGUE_MIN_PLAYERS && n <= LEAGUE_MAX_PLAYERS;
}

export const DEFAULT_DRAFT_SETTINGS: DraftSettings = {
    snakeOrder: true,
    pickTimeLimitMinutes: 60,
    allowGoldenGolfer: true,
};

export const DEFAULT_SCORING_SETTINGS: ScoringSettings = {
    doubleMajors: true,
    allowLIV: false,
    pointValues: { 1: 350, 2: 100, 3: 50 },
};

/** Default settings for a new league (owner and name must be set by caller). */
export function defaultLeagueSettings(overrides: Partial<LeagueSettings> & { name: string; owner: UserID }): LeagueSettings {
    const maxPlayers = overrides.maxPlayers ?? 8;
    return {
        name: overrides.name,
        owner: overrides.owner,
        maxPlayers: Math.max(LEAGUE_MIN_PLAYERS, Math.min(LEAGUE_MAX_PLAYERS, maxPlayers)),
        draftOrderThisWeek: [],
        scoring: overrides.scoring ?? { ...DEFAULT_SCORING_SETTINGS },
        draft: overrides.draft ?? { ...DEFAULT_DRAFT_SETTINGS },
        ...overrides,
    };
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

