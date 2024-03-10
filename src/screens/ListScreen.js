/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList
} from 'react-native';

import Header from '../components/Header';
import {
  SCREEN_HEIGHT
} from '../constant';

import ListItem from '../components/ListItem';
import EmptyComponent from '../components/EmptyComponent';
import LoadingComponent from '../components/LoadingComponent';
import colors from '../theme/colors';

import { fetchData, searchData } from '../features/contentListSlice';

// number of columns in the FlatList
const NUM_COLUMNS = 3;

const ListScreen = () => {
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const { data, currentPage, dataSearched, loading } = useSelector(state => state.content);
  const dispatch = useDispatch();

  // fetch initial data on component mount
  useEffect(() => {
    dispatch(fetchData(currentPage));
  }, []);

  // function to load more data when reaching the end of the list
  const loadMoreData = () => {
    // only fetch next page if search not enable and there is a next page
    if (
      currentPage <= 3 &&
      !isSearchEnabled
    ) {
      dispatch(fetchData(currentPage));
    }
  };

  // background style based on dark mode
  const backgroundStyle = {
    backgroundColor: colors.primary
  };

  const keyExtractor = (item, index) => index.toString();

  // handler for starting search
  const onStartSearching = text => {
    // enable search if the text length is at least 3 characters
    if (text.length >= 3) {
      setIsSearchEnabled(true);
      dispatch(searchData(text));
    }
    // disable search if the text is empty
    if (text.trim().length === 0) {
      setIsSearchEnabled(false);
    }
  };

  // handler for resetting data
  const resetSearch = () => {
    setIsSearchEnabled(false);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* header component for search */}
      <Header
        onStartSearching={onStartSearching}
        resetSearch={resetSearch}
      />
      {loading?  <LoadingComponent />: <FlatList
        style={ListScreenStyles.flatListViewContainer}
        data={isSearchEnabled ? dataSearched : data}
        renderItem={({item}) => <ListItem item={item} />}
        keyExtractor={keyExtractor}
        numColumns={NUM_COLUMNS}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.25}
        showsVerticalScrollIndicator={false}
        initialNumToRender={20}
        ListEmptyComponent={<EmptyComponent />}
      />}
    </SafeAreaView>
  );
};

const ListScreenStyles = StyleSheet.create({
  flatListViewContainer: {
    alignSelf:'center',
    height: '90%',
    backgroundColor: colors.primary,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  emptyView: {
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
  },
});

export default ListScreen;