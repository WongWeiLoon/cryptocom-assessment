import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import SearchInput from '@src/components/SearchInput'

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
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    mainContainer: {
        // backgroundColor: 'red',
        padding: 10,
        paddingTop: 20,
    }
})