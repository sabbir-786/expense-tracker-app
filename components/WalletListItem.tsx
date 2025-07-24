import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { WalletType } from '@/types'
import { Router } from 'expo-router'
import { verticalScale } from 'react-native-size-matters'
import { colors, radius, spacingX } from '@/constants/theme'
import { Image } from 'expo-image'
import Typo from './Typo'
import * as Icons from 'phosphor-react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useTheme } from '@/contexts/ThemeContext';


const WalletListItem = ({
    item,
    index,
    router
}: {
    item: WalletType,
    index: number,
    router: Router
}) => {
    const { theme } = useTheme();


    const openWallet = () => {
        router.push(
            {
                pathname: "/(modals)/walletModal",
                params: {
                    id: item?.id,
                    name: item?.name,
                    image: item?.image,
                }
            }
        )
    }
    return (
        <Animated.View entering={FadeInDown.delay(index * 50).springify().damping(13)}>
            <TouchableOpacity style={[styles.container,
            {
                backgroundColor: theme.neutral900,
                borderRadius: radius._10,
                padding: radius._10,
            },
            ]} onPress={openWallet}>
                {/* Image/Icon */}
                <View style={[
                    styles.imageContainer,
                    { borderColor: theme.border },
                ]}>
                    <Image
                        source={item?.image}
                        contentFit="cover"
                        transition={100}
                        style={{ flex: 1 }}
                    />
                </View>

                <View style={styles.nameContainer}>
                    <Typo size={16} fontWeight="500" color={theme.text}>
                        {item?.name}
                    </Typo>
                    <Typo size={14} color={theme.textLighter}>
                        ₹{item?.amount}
                    </Typo>
                </View>

                {/* Chevron */}
                <Icons.CaretRight
                    size={verticalScale(20)}
                    weight="bold"
                    color={theme.text}
                />

            </TouchableOpacity>
        </Animated.View>
    )
}

export default WalletListItem

const styles = StyleSheet.create({
    container: {
        marginBottom: verticalScale(17),
        flexDirection: "row",
        alignItems: "center",
    },
    touchable: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacingX._15,
        borderRadius: radius._10,
        backgroundColor: colors.neutral800,
    },
    imageContainer: {
        height: verticalScale(45),
        width: verticalScale(45),
        borderWidth: 1,
        borderColor: colors.neutral600,
        borderRadius: radius._12,
        borderCurve: 'continuous',
        overflow: 'hidden',
    },
    nameContainer: {
        flex: 1,
        gap: 2,
        marginLeft: spacingX._10,
    },
})