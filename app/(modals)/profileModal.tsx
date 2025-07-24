import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
<<<<<<< HEAD
import { colors, spacingX, spacingY } from '@/constants/theme';
=======
import { spacingX, spacingY } from '@/constants/theme';
>>>>>>> 940d709 (Update Code)
import { scale, verticalScale } from '@/utils/styling';
import ModalWrapper from '@/components/ModalWrapper';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { getProfileImage } from '@/services/imageService';
import * as Icons from 'phosphor-react-native';
import Typo from '@/components/Typo';
import { UserDataType } from '@/types';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/authContext';
import { updateUser } from '@/services/userService';
import { useRouter } from 'expo-router';
<<<<<<< HEAD
import * as ImagePicker from 'expo-image-picker'

const ProfileModal = () => {
=======
import * as ImagePicker from 'expo-image-picker';
import Input from '@/components/Input';
import { useTheme } from '@/contexts/ThemeContext';

const ProfileModal = () => {
    const { theme } = useTheme();
>>>>>>> 940d709 (Update Code)
    const { user, updateUserData } = useAuth();
    const [userData, setUserData] = useState<UserDataType>({
        name: '',
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setUserData({
                name: user.name || '',
                image: user.image || null,
            });
        }
    }, [user]);

    const onPickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setUserData({ ...userData, image: result.assets[0] });
        }
<<<<<<< HEAD
    }
=======
    };
>>>>>>> 940d709 (Update Code)

    const onSubmit = async () => {
        const { name, image } = userData;

        if (!name.trim()) {
            Alert.alert('User', 'Please fill in all the fields');
            return;
        }

        setLoading(true);

        try {
            const res = await updateUser(user?.uid as string, userData);
            if (res.success) {
                updateUserData(user?.uid as string);
                router.back();
            } else {
                Alert.alert('User', res.msg || 'Failed to update profile');
            }
        } catch (err) {
            Alert.alert('Error', 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalWrapper>
<<<<<<< HEAD
            <View style={styles.container}>
=======
            <View style={[styles.container, { backgroundColor: theme.background }]}>
>>>>>>> 940d709 (Update Code)
                <Header
                    title="Update Profile"
                    leftIcon={<BackButton />}
                    style={{ marginBottom: spacingY._10 }}
                />

                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.avatarContainer}>
                        <Image
<<<<<<< HEAD
                            style={styles.avatar}
=======
                            style={[styles.avatar, { backgroundColor: theme.border }]}
>>>>>>> 940d709 (Update Code)
                            source={getProfileImage(userData.image)}
                            contentFit="cover"
                            transition={100}
                        />

<<<<<<< HEAD
                        <TouchableOpacity style={styles.editIcon} onPress={onPickImage}>
                            <Icons.Pencil
                                size={verticalScale(20)}
                                color={colors.neutral800}
=======
                        <TouchableOpacity style={[styles.editIcon, { backgroundColor: theme.card }]} onPress={onPickImage}>
                            <Icons.Pencil
                                size={verticalScale(20)}
                                color={theme.text}
>>>>>>> 940d709 (Update Code)
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
<<<<<<< HEAD
                        <Typo color={colors.neutral200}>Name</Typo>
                        <TextInput
                            placeholder="Name"
                            placeholderTextColor={colors.neutral400}
                            value={userData.name}
                            onChangeText={(value) => setUserData({ ...userData, name: value })}
                            style={styles.textInput}
=======
                        <Typo color={theme.text}>Name</Typo>
                        <Input
                            placeholder="Enter Your Name"
                            value={userData.name}
                            onChangeText={(value) => setUserData({ ...userData, name: value })}
                            keyboardType="default"
                            autoCapitalize="words"
>>>>>>> 940d709 (Update Code)
                        />
                    </View>
                </ScrollView>
            </View>

<<<<<<< HEAD
            <View style={styles.footer}>
                <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
                    {loading ? (
                        <ActivityIndicator color={colors.black} />
                    ) : (
                        <Typo color={colors.black} fontWeight="700">Update</Typo>
=======
            <View style={[styles.footer, { borderTopColor: theme.border }]}>
                <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
                    {loading ? (
                        <ActivityIndicator color={theme.text} />
                    ) : (
                        <Typo color={theme.text} fontWeight="700">Update</Typo>
>>>>>>> 940d709 (Update Code)
                    )}
                </Button>
            </View>
        </ModalWrapper>
    );
};

export default ProfileModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: spacingY._20,
    },
    form: {
        gap: spacingY._30,
        marginTop: spacingY._15,
    },
    avatarContainer: {
        position: 'relative',
        alignSelf: 'center',
    },
    avatar: {
        alignSelf: 'center',
<<<<<<< HEAD
        backgroundColor: colors.neutral300,
=======
>>>>>>> 940d709 (Update Code)
        height: verticalScale(135),
        width: verticalScale(135),
        borderRadius: 200,
        borderWidth: 1,
<<<<<<< HEAD
        borderColor: colors.neutral500,
=======
        borderColor: '#999', // can be overridden dynamically
>>>>>>> 940d709 (Update Code)
        overflow: 'hidden',
    },
    editIcon: {
        position: 'absolute',
        bottom: spacingY._5,
        right: spacingY._7,
        borderRadius: 100,
<<<<<<< HEAD
        backgroundColor: colors.neutral100,
        shadowColor: colors.black,
=======
        shadowColor: '#000',
>>>>>>> 940d709 (Update Code)
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 4,
        padding: spacingY._7,
    },
    inputContainer: {
        gap: spacingY._10,
    },
<<<<<<< HEAD
    textInput: {
        borderWidth: 1,
        borderColor: colors.neutral100, // or any appropriate neutral/border shade
        color: colors.neutral100,       // text color
        padding: spacingY._10,
        borderRadius: 8,
        backgroundColor: colors.neutral800, // optional but good for contrast
    },

=======
>>>>>>> 940d709 (Update Code)
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: spacingX._20,
        gap: scale(12),
        paddingTop: spacingX._15,
<<<<<<< HEAD
        borderTopColor: colors.neutral100,
=======
>>>>>>> 940d709 (Update Code)
        marginBottom: spacingY._5,
        borderTopWidth: 1,
    },
});
