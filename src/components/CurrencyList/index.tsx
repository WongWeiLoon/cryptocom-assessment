import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput as RNTextInput, View, FlatList, Text, Image, FlatListProps } from 'react-native'
import { Avatar, Icon, TextInput } from 'react-native-paper';

type TextInputType = {
    onSearch: (text: string) => void,
    currencyList: CurrencyInfo[],
    flatListProps?: Partial<FlatListProps<CurrencyInfo>>,
}

type CurrencyInfo = {
    id: string;
    name: string;
    symbol: string;
    code?: string; // optional
}

const SearchInput = ({ onSearch, currencyList, flatListProps }: TextInputType) => {
  const inputRef = useRef<RNTextInput>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState<CurrencyInfo[]>(currencyList);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredList(currencyList);
    } else {
        const searchTerm = searchQuery.toLowerCase();

        const filtered = currencyList.filter(item => {
            const itemName = item.name.toLowerCase();
            const itemSymbol = item.symbol.toLowerCase();

            // Search Criteria 1: Starts with the search term
            const startsWithSearchTerm = itemName.startsWith(searchTerm);

            // Search Criteria 2: Contains space prefixed to search term
            const containsSpacePrefixedSearchTerm = itemName.includes(' ' + searchTerm);

            // Search Criteria 3: Symbol starts with the search term
            const symbolSearchTerm = itemSymbol.startsWith(searchTerm);

            return startsWithSearchTerm || containsSpacePrefixedSearchTerm || symbolSearchTerm;
        });

        setFilteredList(filtered);
    }
  }, [currencyList, searchQuery]);

  const handleChangeText = (searchKey: string) => {
    // console.log('Searching for :', searchKey)
    setSearchQuery(searchKey);
 
    if (onSearch) onSearch(searchKey);
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilteredList(currencyList); // Reset to original list
    setIsFocused(false);
    inputRef.current?.blur();
  };

  return (
    <View style={styles.container}>
        <TextInput
            ref={inputRef}
            placeholder="Search currency"
            value={searchQuery}
            onChangeText={handleChangeText}
            style={styles.input}
            onFocus={() => {
                setIsFocused(true);
                // Keyboard.dismiss();
                inputRef.current?.focus();
            }}
            onBlur={() => {
                setIsFocused(false)
            }}
            mode="outlined"
            left={
            isFocused ? (
                <TextInput.Icon
                icon="arrow-left"
                onPress={handleClear}
                forceTextInputFocus={false}
                />
            ) : null
            }
            right={
            isFocused ? (
                <TextInput.Icon
                icon="close"
                onPress={handleClear}
                forceTextInputFocus={false}
                />
            ) : null
            }
        />

        <FlatList
            data={filteredList}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            ListEmptyComponent={<EmptyView />}
            {...flatListProps}
        />
    </View>
  )
}

export default SearchInput;

const renderItem = ({ item }: { item: CurrencyInfo }) => (
    <View style={styles.rowContainer}>
        <Avatar.Text size={36} label={item.name.charAt(0)} style={styles.avatar} />

        <View style={styles.itemContainer}>
            <Text style={styles.nameTextStyle}>{item.name}</Text>

            {!item.code && (
                <View style={styles.symbolContainer}>
                    <Text style={styles.symbolText}>{item.symbol}</Text>
                    <Icon source="chevron-right" size={25} />
                </View>
            )}
        </View>


    </View>
);

const EmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image source={require('@src/assets/images/not-found-background.png')} style={styles.image} />

        <Text style={styles.noResultMessage}>No Results</Text>
        <Text style={styles.tryMessage}>Try "CRO"</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        width: '100%',
    },
    input: {
        // backgroundColor: '#f5f5f5',
        marginBottom: 10, // set a gap between text-input and Flatlist
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',  // This centers items vertically
        // paddingVertical: 3,   
        paddingHorizontal: 15,
    },
    avatar: {
        backgroundColor: '#191970', 
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        paddingStart: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        width: '100%',
    },
    nameTextStyle: {
        fontSize: 20,
        fontWeight: '400',
        marginLeft: 3,
    },
    symbolContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    symbolText: {
        fontSize: 20,
        color: '#36454F',
        marginEnd: 5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noResultMessage: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginTop: 8,
    },
    tryMessage: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 5,
    },
    image: {
        marginTop: 20,
        width: 130, 
        height: 130, 
        resizeMode: 'contain',  
    },
})