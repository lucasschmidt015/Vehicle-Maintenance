import React, { useState } from 'react';
import LogoDark from '../../assets/images/LogoDark.png';
import LogoWhite from '../../assets/images/LogoWhite.png';
import { StyleSheet, View, Text, Image, TextInput, Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const SignIn = () => {
    const { login } = useAuth();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const router = useRouter();

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {

            await login(email, password);
            router.push({ pathname: '/(tabs)' });
            
        } catch (error) {
            alert('Erro ao realizar login!');
        }
    };

    const navigateToSignUp = () => {
        router.push({ pathname: '/auth/signUp' });
    }

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
            <Image source={ isDarkMode ? LogoDark : LogoWhite } style={styles.image}/>
            <View style={styles.inputView}>
                <TextInput 
                    style={[styles.input, isDarkMode ? styles.inputColorsBlack : styles.inputColorsWhite]} 
                    placeholder="E-mail" 
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={[styles.input, isDarkMode ? styles.inputColorsBlack : styles.inputColorsWhite, { flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                        placeholder="Senha"
                        secureTextEntry={isPasswordHidden}
                        value={password}
                        onChangeText={setPassword} 
                    />
                    <Pressable style={[styles.showPassword, isDarkMode ? styles.inputColorsBlack : styles.inputColorsWhite]} onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                        <Text style={{ color: '#fff', padding: 12 }}>
                            <Entypo name={isPasswordHidden ? 'eye' : 'eye-with-line'} size={24} color={ isDarkMode ? '#fff' : '#000' } />
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.buttomView}>
                <Pressable style={styles.loginButton} onPress={handleLogin}>
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
        fontSize: 16,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    inputColorsWhite: {
        backgroundColor: '#efefef',
        color: '#000',
    },
    inputColorsBlack: {
        backgroundColor: '#1c1c1c',
        color: '#fff',
    },
    showPassword: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#000',
        borderWidth: 1,
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
