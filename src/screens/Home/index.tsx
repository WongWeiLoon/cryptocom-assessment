import React from 'react'
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

import SearchInput from '@src/components/SearchInput'
import FlatButton from '@src/components/FlatButton'

const Home = () => {
  const onHandleSearch = (searchKey: String) => {
    console.log('Searching for :', searchKey)
  }

  return (
    <View style={styles.mainContainer}>
      <SearchInput 
        onSearch={onHandleSearch}
        currencyList={[]}
      />

      <View style={styles.buttonContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
            <FlatButton buttonColor="#007bff" mode="contained" onPress={() => console.log('Pressed')}>
                Clear Data
            </FlatButton>

            <FlatButton buttonColor='#6610f2' mode="contained" onPress={() => console.log('Pressed')}>
                Insert Data
            </FlatButton>

            <FlatButton buttonColor='#343a40' mode="contained" onPress={() => console.log('Pressed')}>
                Show CryptoList 
            </FlatButton>

            <FlatButton buttonColor='#e83e8c' mode="contained" onPress={() => console.log('Pressed')}>
                Show FiatList 
            </FlatButton>

            <FlatButton buttonColor='#000435' mode="contained" onPress={() => console.log('Pressed')}>
                Show All
            </FlatButton>

        </ScrollView>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
        paddingTop: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 15,
        paddingVertical: 30,
        paddingBottom: Platform.OS === 'ios' ? 40 : 30,
        borderTopLeftRadius: 30,    
        borderTopRightRadius: 30,  
        borderBottomLeftRadius: 0, 
        borderBottomRightRadius: 0, 
        borderWidth: 1,          
        borderColor: '#8B8B8B',
    }
})