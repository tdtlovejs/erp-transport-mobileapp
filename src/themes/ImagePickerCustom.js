import {Image, Modal, Pressable, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import React, {useContext, useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ACTIVE_1, DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../utils/colors';
import {MIN_SIZE_IMAGE, THEME_DARK} from '../utils/constants';
import {AppContext} from '../contexts/AppContext';

const ImagePickerCustom = (props) => {
    const {
        onChangeImage,
        uri
    } = props;
    const {
        theme,
    } = useContext(AppContext);

    const [uriState, setUriState] = useState(null);
    const [openMenuImage, setOpenMenuImage] = useState(false);

    useEffect(() => {
        if (uri !== uriState) {
            setUriState(uri)
        }
    }, [uri])
    const onImageFromCamera = () => {
        setOpenMenuImage(false)
        launchCamera()
            .then(res => {
                if (Array.isArray(res.assets) && res.assets.length > 0) {
                    if (res.assets[0].fileSize > MIN_SIZE_IMAGE) {
                        ToastAndroid.showWithGravity(
                            'Ban khong duoc tai anh tren 2mb',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                        );
                    } else {
                        onChangeImage(res.assets[0])
                        setUriState(prev => res.assets[0].uri || prev)
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const onImageFromLibrary = () => {
        setOpenMenuImage(false)
        launchImageLibrary()
            .then(res => {
                if (Array.isArray(res.assets) && res.assets.length > 0) {
                    if (res.assets[0].fileSize > MIN_SIZE_IMAGE) {
                        ToastAndroid.showWithGravity(
                            'Ban khong duoc tai anh tren 2mb',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                        );
                    } else {
                        onChangeImage(res.assets[0])
                        setUriState(prev => res.assets[0].uri || prev)
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
       <>
           <TouchableOpacity
               style={[
                   styles.cameraBtn,
                   (theme === THEME_DARK ? styles.cameraBtnDark : {})
               ]}
               onPress={() => {
                   // onImageFromLibrary()
                   setOpenMenuImage(true)
               }}
           >
               {
                   uriState
                       ?
                       <Image
                           source={{
                               uri: uriState
                           }}
                           style={styles.image}
                       />
                       :
                       <IonIcon
                           name={'camera'}
                           size={100}
                           color={theme === THEME_DARK ? DARK_1 : LIGHT_1}
                       />
               }
           </TouchableOpacity>
           {openMenuImage && <Modal
               onRequestClose={() => {
                   setOpenMenuImage(false);
               }}
               animationType="fade"
               transparent={true}
           >
               <Pressable
                   style={[
                       styles.containerMenuImage,
                       (theme === THEME_DARK ? styles.containerMenuImageDark : {})
                   ]}
                   onPress={() => {
                       setOpenMenuImage(false);
                   }}
               >
                   <View style={[
                       styles.menuImage,
                       (theme === THEME_DARK ? styles.menuImageDark : {})
                   ]}>
                       <TouchableOpacity
                           style={styles.typeImageBtn}
                           onPress={() => {
                               onImageFromCamera();
                           }}
                       >
                           <Text style={[
                               styles.typeImageText,
                               (theme === THEME_DARK ? styles.typeImageTextDark : {})
                           ]}>
                               Open Camera
                           </Text>
                       </TouchableOpacity>
                       <TouchableOpacity
                           style={styles.typeImageBtn}
                           onPress={() => {
                               onImageFromLibrary();
                           }}
                       >
                           <Text style={[
                               styles.typeImageText,
                               (theme === THEME_DARK ? styles.typeImageTextDark : {})
                           ]}>
                               Open Library
                           </Text>
                       </TouchableOpacity>
                   </View>
               </Pressable>
           </Modal>}
       </>
    )
}
export default ImagePickerCustom;
const styles = StyleSheet.create({
    cameraBtn: {
        borderRadius: 60,
        width: 120,
        height: 120,
        backgroundColor: LIGHT_2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraBtnDark: {
        backgroundColor: DARK_2,
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 60,
    },
    containerMenuImage: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(4, 41, 58, 0.3)',
        paddingHorizontal: 20,
    },
    containerMenuImageDark: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    menuImage: {
        backgroundColor: LIGHT_1,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 5,
    },
    menuImageDark: {
        backgroundColor: DARK_1,
    },
    typeImageBtn: {
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    typeImageText: {
        color: DARK_1,
        fontSize: 15,
    },
    typeImageTextDark: {
        color: LIGHT_1,
    }
})
