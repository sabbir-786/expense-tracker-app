import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Typo from '@/components/Typo'
import Button from '@/components/Button'
import { colors } from '@/constants/theme'

import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useAuth } from '@/contexts/authContext'
import ScreenWrapper from '@/components/ScreenWrapper'


const Home = () => {

    const { user } = useAuth();



    const handleLogout = async () => {
        await signOut(auth);

    };
    return (
        <ScreenWrapper>
            <Typo>Home</Typo>
            <Button onPress={handleLogout}>
                <Typo color={colors.black}>Log Out</Typo>
            </Button>
        </ScreenWrapper>
    )
}

export default Home

const styles = StyleSheet.create({})