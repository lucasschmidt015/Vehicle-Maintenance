import React, { useState } from 'react';
import Logo from '../../assets/images/Logo.png';
import { StyleSheet, View, Text, Image, TextInput, Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';

const SignIn = () => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const router = useRouter();

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);


    const navigateToSignUp = () => {
        router.push({ pathname: '/auth/signUp' });
    }

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
            <Image source={Logo} style={styles.image}/>
            <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder="E-mail" />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={[styles.input, { flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                        placeholder="Senha"
                        secureTextEntry={isPasswordHidden}
                    />
                    <Pressable style={styles.showPassword} onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                        <Text style={{ color: '#fff', padding: 12 }}>
                            <Entypo name={isPasswordHidden ? 'eye' : 'eye-with-line'} size={24} color="#fff" />
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.buttomView}>
                <Pressable style={styles.loginButton}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>Entrar</Text>
                </Pressable>
                <Pressable style={styles.registerButton} onPress={navigateToSignUp}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>Criar Conta</Text>
                </Pressable>
            </View>
            <View style={{ width: '80%', height: 1, backgroundColor: 'gray', marginVertical: 20 }} />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
    },
    inputView: {
        width: '90%',
        justifyContent: 'center',
    },
    input: {
        padding: 15,
        marginVertical: 12,
        borderWidth: 1,
        backgroundColor: '#1c1c1c',
        color: '#fff',
        fontSize: 16,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    showPassword: {
        backgroundColor: '#1c1c1c',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    buttomView: {
        width: '90%',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 120,        
    },
    loginButton: {
        padding: 15,
        marginVertical: 12,
        backgroundColor: '#008cc3',
        borderRadius: 10,
    },
    registerButton: {
        padding: 15,
        marginVertical: 12,
        backgroundColor: '#1c1c1c',
        borderRadius: 10,
    }
})

export default SignIn;
