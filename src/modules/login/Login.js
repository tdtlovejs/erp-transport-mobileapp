import React, {useContext, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Input from '../../themes/Input';
import FormItem from '../../themes/FormItem';
import {AppContext} from '../../contexts/AppContext';
import authApi from "../../api/authApi";
import ContainerWrapper from "../../themes/ContainerWrapper";
import ButtonCustom from "../../themes/ButtonCustom";


const Login = (props) => {
    const {
        setUser,
        setLoading
    } = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onLogin = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('username', username)
        formData.append('password', password)
        const res = await authApi.login(formData)
        if (res.status === 200) {
            setUser(res.data);
        }
        setLoading(false);
    }
    return (
        <ContainerWrapper
            hasScrollView={true}
        >
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/logoFull.png')}
                    style={styles.logoImage}
                />
            </View>
            <FormItem
                label="username"
                input={
                    <Input
                        value={username}
                        onChangeText={(text) => {
                            setUsername(text)
                        }}
                    />
                }
            />
            <FormItem
                label="password"
                input={
                    <Input
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text)
                        }}
                        secureTextEntry={true}
                        inputType="password"
                    />
                }
            />
            <ButtonCustom
                text={"Login"}
                onPress={() => {
                    onLogin()
                }}
            />
        </ContainerWrapper>
    )
}

export default Login;
const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    logoImage: {
        height: 180,
        width: 180,
    }
})
