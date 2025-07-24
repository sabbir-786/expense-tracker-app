import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from 'firebase/auth';
import { auth, firestore } from '@/config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { verticalScale, scale } from 'react-native-size-matters';
import { ArrowLeft, PencilSimple } from 'phosphor-react-native';

interface EditProfileModalProps {
    visible: boolean;
    onClose: () => void;
    onProfileUpdated?: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ visible, onClose, onProfileUpdated }) => {
    const [name, setName] = useState(auth.currentUser?.displayName || '');
    const [photo, setPhoto] = useState<string | null>(auth.currentUser?.photoURL || null);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!auth.currentUser) return;
        setSaving(true);
        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo,
            });
            const userDoc = doc(firestore, 'users', auth.currentUser.uid);
            await updateDoc(userDoc, { name, image: photo });
            onProfileUpdated?.();
            onClose();
        } catch (err) {
            console.error('Failed to save profile:', err);
        } finally {
            setSaving(false);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            quality: 0.8,
        });
        if (!result.canceled) setPhoto(result.assets[0].uri);
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Header with back icon and title */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <ArrowLeft size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Update Profile</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    {/* Avatar section */}
                    <TouchableOpacity onPress={pickImage} disabled={saving} style={styles.avatarContainer}>
                        <Image
                            source={photo ? { uri: photo } : require('@/assets/images/defaultAvatar.png')}
                            style={styles.avatar}
                        />
                        <View style={styles.editIcon}>
                            <PencilSimple size={16} color="#fff" />
                        </View>
                    </TouchableOpacity>

                    {/* Name input */}
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter name"
                        placeholderTextColor="#A1A1AA"
                        editable={!saving}
                    />

                    {/* Save button */}
                    <TouchableOpacity onPress={handleSave} style={styles.saveButton} disabled={saving}>
                        <Text style={styles.saveButtonText}>{saving ? 'Saving...' : 'Update'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default EditProfileModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#111827',
        padding: scale(20),
        borderRadius: 16,
        width: '90%',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: verticalScale(20),
    },
    headerTitle: {
        color: '#fff',
        fontSize: verticalScale(18),
        fontWeight: 'bold',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: verticalScale(20),
    },
    avatar: {
        width: verticalScale(90),
        height: verticalScale(90),
        borderRadius: 45,
        backgroundColor: '#374151',
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#4F46E5',
        padding: 6,
        borderRadius: 20,
    },
    label: {
        color: '#9CA3AF',
        alignSelf: 'flex-start',
        marginBottom: 4,
        marginTop: verticalScale(4),
    },
    input: {
        backgroundColor: '#1F2937',
        color: '#fff',
        padding: scale(12),
        borderRadius: 8,
        width: '100%',
        marginBottom: verticalScale(24),
    },
    saveButton: {
        backgroundColor: '#65A30D',
        paddingVertical: scale(12),
        paddingHorizontal: scale(20),
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: verticalScale(14),
    },
});
