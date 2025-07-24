import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router';

<<<<<<< HEAD

=======
>>>>>>> 940d709 (Update Code)
const index = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                resizeMode="contain"
                source={require('../assets/images/splashImage.png')}
            />
<<<<<<< HEAD

=======
>>>>>>> 940d709 (Update Code)
        </View>
    );
};

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.neutral900,
    },
    logo: {
        height: "20%",
        aspectRatio: 1,
    }
})