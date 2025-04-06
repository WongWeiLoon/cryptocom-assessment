import React, { useCallback, useState } from 'react'
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'

import CurrencyList from '@src/components/CurrencyList'
import FlatButton from '@src/components/FlatButton'

import cryptoData from '@src/mockData/crypto/cryptoCurrencies.json';
import fiatData from '@src/mockData/currency/fiatCurrencies.json';
import { CurrencyInfo } from '@src/database/models/CurrencyInfo';

import * as DatabaseService from '@src/database/DatabaseService'
import { Snackbar } from 'react-native-paper'

const Home = () => {
  const [snackbar, setSnackbar] = useState<{visible: boolean, message: string, key?: number}>({
    visible: false,
    message: '',
    key: 0, // Add a key to force re-render
  });
  const [currencyList, setCurrencyList] = useState<CurrencyInfo[]>([]);

  const showSnackbar = (message: string) => {
    setSnackbar({ 
        visible: true, 
        message,
        key: Date.now()
    })
  };
  
  const onHandleSearch = (searchKey: String) => {
    // console.log('Searching for :', searchKey)
  }

  // Clearing all records from 'CryptoCurrency' and 'FiatCurrency' tables when 'Button 1' is pressed.
  const handleClearData = async () => {
    try {
        await DatabaseService.clearAllData();
        setCurrencyList([]);
        showSnackbar('Data cleared successfully!');
    } catch (error) {
        showSnackbar(`Failed to clear data due to ${error}`);
    }
  }

  // Insert mockData into 'CryptoCurrency' and 'FiatCurrency' tables when 'Button 2' is pressed.
  const onInsertData = async () => {
    try {
        await DatabaseService.insertCryptoCurrencyData(cryptoData);
        await DatabaseService.insertFiatCurrencyData(fiatData);

        showSnackbar('Data inserted successfully!');
    } catch (error) {
        showSnackbar(`Failed to insert data due to ${error}`);
    }
  }

  // Get and display 'CryptoCurrency' list when 'Button 3' is pressed.
  const displayCryptoData = async() => {
    try {
        const cryptosData = await DatabaseService.getCryptoCurrencyData() as CurrencyInfo[];
        // console.log({cryptosData})

        if (Array.isArray(cryptosData) && cryptosData.length === 0) {
            showSnackbar('No crypto data yet. Please insert data first.');
        } else if (Array.isArray(cryptosData) && cryptosData.length > 0) {
            // console.log('Crypto data to display:', cryptosData);
            setCurrencyList(cryptosData);
            showSnackbar('Crypto data loaded!');
        } else {
            showSnackbar('Unexpected data format received.');
        }
    } catch (error) {
        showSnackbar(`Failed to display Crypto-Currency due to ${error}`);
    }
  }

  // Get and display 'FiatCurrency' list when 'Button 4' is pressed.
  const displayFiatData = async () => {
    try {
        const fiatsData = await DatabaseService.getFiatCurrencyData() as CurrencyInfo[];
        // console.log({fiatsData})

        if (Array.isArray(fiatsData) && fiatsData.length === 0) {
            showSnackbar('No fiat data yet. Please insert data first.');
        } else if (Array.isArray(fiatsData) && fiatsData.length > 0) {
            setCurrencyList(fiatsData);
            showSnackbar('Fiat data loaded!');
        } else {
            showSnackbar('Unexpected data format received.');
        }
    } catch (error) {
        showSnackbar(`Failed to display Fiat-Currency due to ${error}`);
    }
  }

  // Get and display all Currency list (CryptoCurrency & FiatCurrency) when 'Button 5' is pressed.
  const displayAllCurrencyInfo = async () => {
    try {
        const alldata = await DatabaseService.getAllCurrencyData() as CurrencyInfo[];
        // console.log({alldata})

        if (Array.isArray(alldata) && alldata.length === 0) {
            showSnackbar('No Data yet. Please insert data first.');
        } else if (Array.isArray(alldata) && alldata.length > 0) {
            setCurrencyList(alldata);
            showSnackbar('All currency data loaded!');
        } else {
            showSnackbar('Unexpected data format received.');
        }
    } catch (error) {
        showSnackbar(`Failed to display All-Currencies data due to ${error}`);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <CurrencyList 
        onSearch={onHandleSearch}
        currencyList={currencyList}
        flatListProps={{
            ListFooterComponent: <View style={{ height: 200 }} />, // Added space at the end of the list to ensure all items are fully visible
        }}
      />

      <View style={styles.buttonContainer}>
        <Text style={styles.viewMoreText}>Scroll to See More</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewContainer}>
            <FlatButton 
                buttonColor="#007bff" 
                onPress={handleClearData}
            >
                Clear Data
            </FlatButton>

            <FlatButton 
                buttonColor='#6610f2' 
                onPress={onInsertData}
            >
                Insert Data
            </FlatButton>

            <FlatButton 
                buttonColor='#343a40' 
                onPress={displayCryptoData}
            >
                Show CryptoList 
            </FlatButton>

            <FlatButton 
                buttonColor='#e83e8c' 
                onPress={displayFiatData}
            >
                Show FiatList 
            </FlatButton>

            <FlatButton 
                buttonColor='#000435' 
                onPress={displayAllCurrencyInfo}
            >
                Show All
            </FlatButton>

        </ScrollView>
      </View>


      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        action={{
            label: 'OK',
            onPress: () => {
                setSnackbar({ ...snackbar, visible: false })
            },
        }}
        duration={3000}
        style={styles.snackbar} 
      >
        {snackbar.message}
      </Snackbar>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    viewMoreText: {
        textAlign: 'left',       
        color: 'gray',           
        marginTop: 15,    
        marginHorizontal: 10,    
        fontSize: 15,            
    },
    scrollViewContainer: {
        paddingTop: Platform.OS === 'ios' ? 20 : 15,
        paddingBottom: Platform.OS === 'ios' ? 45 : 30,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderTopLeftRadius: 30,    
        borderTopRightRadius: 30,  
        borderBottomLeftRadius: 0, 
        borderBottomRightRadius: 0, 
        borderWidth: 1,          
        borderColor: '#8B8B8B',
    },
    snackbar: {
        width: '100%',
    }
})