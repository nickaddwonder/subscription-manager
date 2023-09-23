import addContentToDatabase from '../addContentToDatabase';
import { database } from '@/app/firebase';
import { addDoc, collection } from 'firebase/firestore';

jest.mock('@/app/firebase', () => ({
  database: 'mocked-database',
}));

// Mock the firestore functions
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

  it('should add content and return success and docRef', async () => {
    const mockDocRef = { id: '1234' }; // Your mock doc reference

    (addDoc as jest.Mock).mockResolvedValueOnce(mockDocRef);

    const result = await addContentToDatabase(
      { title: 'Test Title' },
      'some-collection'
    );

    expect(result).toEqual({
      success: true,
      docRef: mockDocRef,
    });
    expect(collection).toHaveBeenCalledWith(database, 'some-collection');
    expect(addDoc).toHaveBeenCalledWith('mocked-collection', {
      title: 'Test Title',
    });
  });

  it('should catch errors and return success as false', async () => {
    const mockError = new Error('An error occurred');

    (addDoc as jest.Mock).mockRejectedValueOnce(mockError);

    const result = await addContentToDatabase(
      { title: 'Test Title' },
      'some-collection'
    );

    expect(result).toEqual({
      success: false,
      error: mockError,
    });
  });
});
