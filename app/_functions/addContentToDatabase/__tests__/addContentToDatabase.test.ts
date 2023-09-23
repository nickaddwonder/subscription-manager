// addContentToDatabase.test.ts

import addContentToDatabase from '../addContentToDatabase';
import { database } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import TvShow from '@customTypes/TvShow';

// Mock the database and firestore functions
jest.mock('@/firebase', () => ({
  database: 'mocked-database',
}));

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
  collection: jest.fn((db, name) => {
    if (db === 'mocked-database' && name === 'some-collection') {
      return 'mocked-collection';
    }
    throw new Error('Unexpected arguments to collection');
  }),
}));

describe('addContentToDatabase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a TvShow content and return success and docRef', async () => {
    const mockDocRef = { id: '1234' }; // Your mock doc reference
    const mockTvShow: TvShow = {
      id: 101,
      name: 'Test Show',
      original_name: 'Test Original Name',
      poster_path: '/path/to/poster',
      popularity: 10.5,
      backdrop_path: '/path/to/backdrop',
      vote_average: 8.5,
      overview: 'This is a test show overview.',
      origin_country: ['US'],
      genre_ids: [1, 2, 3],
      original_language: 'en',
      vote_count: 200,
      first_air_date: new Date('2023-01-01'),
    };

    (addDoc as jest.Mock).mockResolvedValueOnce(mockDocRef);

    const result = await addContentToDatabase(mockTvShow, 'some-collection');

    expect(result).toEqual({
      success: true,
      docRef: mockDocRef,
    });
    expect(collection).toHaveBeenCalledWith(database, 'some-collection');
    expect(addDoc).toHaveBeenCalledWith('mocked-collection', mockTvShow);
  });

  it('should catch errors and return success as false', async () => {
    const mockError = new Error('An error occurred');
    const mockTvShow: TvShow = {
      id: 101,
      name: 'Test Show',
      original_name: 'Test Original Name',
      poster_path: '/path/to/poster',
      popularity: 10.5,
      backdrop_path: '/path/to/backdrop',
      vote_average: 8.5,
      overview: 'This is a test show overview.',
      origin_country: ['US'],
      genre_ids: [1, 2, 3],
      original_language: 'en',
      vote_count: 200,
      first_air_date: new Date('2023-01-01'),
    };

    (addDoc as jest.Mock).mockRejectedValueOnce(mockError);

    const result = await addContentToDatabase(mockTvShow, 'some-collection');

    expect(result).toEqual({
      success: false,
      error: mockError,
    });
  });
});
