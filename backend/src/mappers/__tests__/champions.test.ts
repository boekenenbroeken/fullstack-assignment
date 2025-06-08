import { describe, it, expect } from 'vitest';
import { championsMapper } from '../champions';
import {
  mockChampionApiResponse,
  brokenMissingStandingsTable,
  brokenMissingStandingsList,
  brokenMissingDriverStanding,
  brokenMissingDriver,
  brokenMissingConstructor,
} from './__mocks__/champions.mock';

describe('championsMapper', () => {
  it('should map valid ChampionApiResponse correctly', () => {
    const result = championsMapper(mockChampionApiResponse);

    expect(result).toEqual([
      {
        season: '2021',
        driver: {
          id: 'hamilton',
          name: 'Lewis Hamilton',
          nationality: 'British',
        },
        constructorName: 'Mercedes',
      },
    ]);
  });

  it('should throw an error if StandingsTable is missing', () => {
    expect(() => championsMapper(brokenMissingStandingsTable)).toThrow('Missing StandingsTable');
  });

  it('should throw if StandingsList is missing', () => {
    expect(() => championsMapper(brokenMissingStandingsList)).toThrow('Missing StandingsList');
  });

  it('should throw if DriverStanding is missing', () => {
    expect(() => championsMapper(brokenMissingDriverStanding)).toThrow('Missing DriverStanding');
  });

  it('should throw if Driver is missing', () => {
    expect(() => championsMapper(brokenMissingDriver)).toThrow('Incomplete data');
  });

  it('should throw if Constructor is missing', () => {
    expect(() => championsMapper(brokenMissingConstructor)).toThrow('Incomplete data');
  });
});
