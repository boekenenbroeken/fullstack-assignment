import { describe, it, expect } from 'vitest';
import { championMapper } from '../champions';
import {
  mockChampionApiResponse,
  brokenMissingStandingsTable,
  brokenMissingStandingsList,
  brokenMissingDriverStanding,
  brokenMissingDriver,
  brokenMissingConstructor,
} from './__mocks__/champions.mock';

describe('championMapper', () => {
  it('should map valid ChampionApiResponse correctly', () => {
    const result = championMapper(mockChampionApiResponse);

    expect(result).toEqual({
      season: '2021',
      driver: {
        id: 'hamilton',
        name: 'Lewis Hamilton',
        nationality: 'British',
      },
      team: {
        id: 'mercedes',
        name: 'Mercedes',
      },
    });
  });

  it('should throw an error if StandingsTable is missing', () => {
    expect(() => championMapper(brokenMissingStandingsTable)).toThrow('Missing StandingsTable');
  });

  it('should throw if StandingsList is missing', () => {
    expect(() => championMapper(brokenMissingStandingsList)).toThrow(
      'Missing StandingsList for season 2021'
    );
  });

  it('should throw if DriverStanding is missing', () => {
    expect(() => championMapper(brokenMissingDriverStanding)).toThrow(
      'Missing DriverStanding for season 2021'
    );
  });

  it('should throw if Driver is missing', () => {
    expect(() => championMapper(brokenMissingDriver)).toThrow('Incomplete data for season 2021');
  });

  it('should throw if Constructor is missing', () => {
    expect(() => championMapper(brokenMissingConstructor)).toThrow(
      'Incomplete data for season 2021'
    );
  });
});
