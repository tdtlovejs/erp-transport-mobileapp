import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Input from './Input';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
    ACTIVE_2,
    DARK_1, DARK_2,
    LIGHT_1, LIGHT_2,
} from '../utils/colors';
import _, {debounce} from 'lodash';
import {delay} from '../utils/functions';
import {SAVE_STATUS_PROCESS, THEME_DARK} from '../utils/constants';
import {AppContext} from '../contexts/AppContext';
import Loading from './Loading';
import NoMore from './NoMore';
import {useTranslation} from 'react-i18next';
import axios from "axios";
import axiosClient from "../api/axiosClient";
const pageSize = 10;
const FlatListApp = (props) => {
    const {
        items,
        onPressItem,
        listKeySearch,
        isDownloaded,
        onPressDownload,
        saveStatus,
        renderItem,
        keyView,
        hideHeader,
        keyExtractor,
        numColumns,
        uniqueKey,
        viewHeader,
        full,
        apiNameList,
        forceUpdate
    } = props;
    const {
        theme
    } = useContext(AppContext);
    const {t} = useTranslation();
    const [data, setData] = useState([]);
    const [searchTextTemp, setSearchTextTemp] = useState('');
    const [options, setOptions] = useState({
        page: 1,
        isEnd: null,
        searchText: '',
        loading: false
    })
    const {
        page,
        isEnd,
        searchText,
        loading
    } = options;

    useEffect(() => {
        if (forceUpdate) {
            setData([])
            if (page === 1) {
                setOptions(prev => ({
                    ...prev,
                    isEnd: false,
                }))
                getData(page)
            } else {
                setOptions(prev => ({
                    ...prev,
                    page: 1,
                    isEnd: false,
                }))
            }
        }
    }, [forceUpdate])

    useEffect(() => {
        if (page) {
            getData(page)
        }
    }, [page, searchText])

    const getData = (currentPage) => {
        setOptions(prev => ({
            ...prev,
            loading: true
        }))
        axiosClient.get(`${apiNameList}?page=${currentPage}&search=${searchText}`)
            .then(res => {
                if (Array.isArray(res.data.items)) {
                    setData(prev => {
                        return _.uniqBy([...prev, ...res.data.items], '_id')
                    })
                    setOptions(prev => ({
                        ...prev,
                        loading: false,
                        ...(page >= res.data.nbPages ? {isEnd: true} : {}),
                    }))
                } else {
                    setOptions(prev => ({
                        ...prev,
                        loading: false
                    }))
                }
            })
            .catch(err => {
                setOptions(prev => ({
                    ...prev,
                    loading: false
                }))
            })
    }
    const onChangeSearch = (text) => {
        setData([])
        setOptions(prev => ({
            ...prev,
            page: 1,
            isEnd: false,
            searchText: text
        }))
    }
    const debounceUpdate = useCallback(debounce((nextValue) => {
        onChangeSearch(nextValue);
    }, 200), [])
    useEffect(() => {
        debounceUpdate(searchTextTemp)
    }, [searchTextTemp])
    return (
        <>
            <View style={styles.header}>
                <View style={styles.inputSearchWrapper}>
                    <Input
                        value={searchTextTemp}
                        onChangeText={(text) => {
                            setSearchTextTemp(text)
                        }}
                        placeholder={t('label.search')}
                        style={[
                            styles.inputSearch,
                            (theme === THEME_DARK ? styles.inputSearchDark : {})
                        ]}
                    />
                    {searchTextTemp !== "" && <TouchableOpacity
                        style={[
                            styles.resetSearch,
                        ]}
                        onPress={() => {
                            setSearchTextTemp('')
                        }}
                    >
                        <IonIcon
                            name="close"
                            color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                            size={18}
                        />
                    </TouchableOpacity>}
                </View>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem ? renderItem : ({item,index}) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                onPressItem(item);
                            }}
                            style={[
                                styles.itemView,
                                (theme === THEME_DARK ? styles.itemViewDark : {})
                            ]}
                            key={item.uid}
                        >
                            <Text style={[
                                styles.itemViewText,
                                (theme === THEME_DARK ? styles.itemViewTextDark : {})
                            ]}>
                                {keyView ? item[keyView] :item.title}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={keyExtractor ? keyExtractor : (item => item._id)}
                onEndReached={() => {
                    if (!loading && !isEnd) {
                        setOptions(prev => ({
                            ...prev,
                            page: prev.page + 1
                        }))
                    }
                }}
                onEndReachedThreshold={0.5}
                onScrollBeginDrag={() => {

                }}
                ListFooterComponent={() => {
                    if (full) {
                        return (
                            <></>
                        )
                    }
                    if (loading) {
                        return (
                            <Loading />
                        )
                    } else if (isEnd){
                        return (
                            <NoMore />
                        )
                    } else {
                        return null;
                    }
                }}
                numColumns={numColumns}
            />
        </>
    )
}

export default FlatListApp;
const styles = StyleSheet.create({
    header: {
        paddingBottom: 5,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputSearchWrapper: {
        flex: 1,
        position: 'relative',
    },
    inputSearch: {
        color: DARK_1,
    },
    inputSearchDark: {
        color: LIGHT_1,
    },
    resetSearch: {
        position: 'absolute',
        right: 10,
        top: 18,
        color: LIGHT_1,
    },
    resetSearchDark: {
        color: DARK_1,
    },
    actionDownload: {
        marginLeft: 10,
    },
    itemView: {
        borderBottomWidth: 0.5,
        borderBottomColor: DARK_2,
        marginHorizontal: 10,
        paddingVertical: 10
    },
    itemViewDark: {
        borderBottomColor: LIGHT_2,
    },
    itemViewText: {
        fontWeight: '400',
        fontSize: 16,
        color: DARK_1
    },
    itemViewTextDark: {
        color: LIGHT_1
    }
})

