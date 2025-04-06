import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import Demo from './index';
import * as DatabaseService from '@src/database/DatabaseService';

// Mock the DatabaseService
jest.mock('@src/database/DatabaseService', () => ({
    clearAllData: jest.fn(),
    insertCryptoCurrencyData: jest.fn(),
    insertFiatCurrencyData: jest.fn(),
    getCryptoCurrencyData: jest.fn(),
    getFiatCurrencyData: jest.fn(),
    getAllCurrencyData: jest.fn()
}));

// Mock data
const mockCryptoData = [
    { id: '1', name: 'Bitcoin', symbol: 'BTC', type: 'crypto' },
    { id: '2', name: 'Ethereum', symbol: 'ETH', type: 'crypto' }
];

const mockFiatData = [
    { id: '3', name: 'US Dollar', symbol: 'USD', type: 'fiat' },
    { id: '4', name: 'Euro', symbol: 'EUR', type: 'fiat' }
];

const mockAllData = [...mockCryptoData, ...mockFiatData];

describe('Demo Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mocks before each test
    });

    // Test 1: renders all buttons
    test('renders correctly', () => {
        const { getByText } = render(<Demo />);
        expect(getByText('Scroll to See More')).toBeTruthy();
        expect(getByText('Clear Data')).toBeTruthy();
        expect(getByText('Insert Data')).toBeTruthy();
        expect(getByText('Show CryptoList')).toBeTruthy();
        expect(getByText('Show FiatList')).toBeTruthy();
        expect(getByText('Show All')).toBeTruthy();
    });

    // Test 2: clear data
    test('clears data when Clear Data button is pressed', async () => {
        (DatabaseService.clearAllData as jest.Mock).mockResolvedValueOnce(undefined);
        
        const { getByText, findByText } = render(<Demo />);
        
        fireEvent.press(getByText('Clear Data'));
        
        await waitFor(() => {
          expect(DatabaseService.clearAllData).toHaveBeenCalledTimes(1);
        });
        
        const snackbarMessage = await findByText('Data cleared successfully!');
        expect(snackbarMessage).toBeTruthy();
    });
    
    // Test 3: Insert data
    test('inserts data when Insert Data button is pressed', async () => {
        (DatabaseService.insertCryptoCurrencyData as jest.Mock).mockResolvedValueOnce(undefined);
        (DatabaseService.insertFiatCurrencyData as jest.Mock).mockResolvedValueOnce(undefined);
        
        const { getByText, findByText } = render(<Demo />);
        
        fireEvent.press(getByText('Insert Data'));
        
        await waitFor(() => {
          expect(DatabaseService.insertCryptoCurrencyData).toHaveBeenCalledTimes(1);
          expect(DatabaseService.insertFiatCurrencyData).toHaveBeenCalledTimes(1);
        });
        
        const snackbarMessage = await findByText('Data inserted successfully!');
        expect(snackbarMessage).toBeTruthy();
    });

    // Test 4: Display CryptoList
    test('displays crypto data when Show CryptoList button is pressed', async () => {
        (DatabaseService.getCryptoCurrencyData as jest.Mock).mockResolvedValueOnce(mockCryptoData);
        
        const { getByText, findByText } = render(<Demo />);
        
        fireEvent.press(getByText('Show CryptoList'));
        
        await waitFor(() => {
          expect(DatabaseService.getCryptoCurrencyData).toHaveBeenCalledTimes(1);
        });
        
        const snackbarMessage = await findByText('Crypto data loaded!');
        expect(snackbarMessage).toBeTruthy();
    });

    // Test 5: Display FiatList
    test('displays fiat data when Show FiatList button is pressed', async () => {
        (DatabaseService.getFiatCurrencyData as jest.Mock).mockResolvedValueOnce(mockFiatData);
        
        const { getByText, findByText } = render(<Demo />);
        
        fireEvent.press(getByText('Show FiatList'));
        
        await waitFor(() => {
          expect(DatabaseService.getFiatCurrencyData).toHaveBeenCalledTimes(1);
        });
        
        const snackbarMessage = await findByText('Fiat data loaded!');
        expect(snackbarMessage).toBeTruthy();
    });

    // Test 6: Display CryptoList & FiatList
    test('displays all currency data when Show All button is pressed', async () => {
        (DatabaseService.getAllCurrencyData as jest.Mock).mockResolvedValueOnce(mockAllData);
        
        const { getByText, findByText } = render(<Demo />);
        
        fireEvent.press(getByText('Show All'));
        
        await waitFor(() => {
          expect(DatabaseService.getAllCurrencyData).toHaveBeenCalledTimes(1);
        });
        
        const snackbarMessage = await findByText('All currency data loaded!');
        expect(snackbarMessage).toBeTruthy();
    });
});