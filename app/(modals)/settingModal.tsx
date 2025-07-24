import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform,
    Switch,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import * as Icon from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import ModalWrapper from '@/components/ModalWrapper';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { colors, spacingY } from '@/constants/theme';
import ScreenWrapper from '@/components/ScreenWrapper';

const SettingsScreen = () => {
    const { theme, toggleTheme, mode } = useTheme();
    const router = useRouter();

    const settingsList = [
        {
            group: [
                { title: 'Language', icon: <Icon.Globe size={22} />, route: '/settings/language' },
                { title: 'Privacy Policy', icon: <Icon.ShieldCheck size={22} />, route: '/settings/privacy' },
                { title: 'Terms of Services', icon: <Icon.FileText size={22} />, route: '/settings/terms' },
                { title: 'About App', icon: <Icon.Info size={22} />, route: '/settings/about' },
            ]
        },
        {
            group: [
                {
                    title: 'Dark Mode',
                    icon: <Icon.MoonStars size={22} />,
                    type: 'toggle'
                },
                {
                    title: 'Rate Us',
                    icon: <Icon.Star size={22} />,
                    action: () => { /* TODO: Link to Store */ }
                },
                {
                    title: 'Share with Friends',
                    icon: <Icon.ShareFat size={22} />,
                    action: () => { /* TODO: Share logic */ }
                },
                {
                    title: 'More Apps',
                    icon: <Icon.GridFour size={22} />,
                    route: '/settings/more-apps'
                },
            ]
        }
    ];

    return (
        <ScreenWrapper>
            <Header
                title={'Settings'}
                leftIcon={<BackButton />}
                style={{ marginBottom: spacingY._10, marginLeft: spacingY._10 }}
            />
            <ScrollView
                style={[styles.container, { backgroundColor: theme.background }]}
                contentContainerStyle={{ paddingBottom: 20 }}
            >

                <View style={[styles.card, { backgroundColor: theme.card }]}>
                    <View style={styles.cardContent}>
                        <Text style={[styles.cardTitle, { color: theme.text }]}>
                            Upgrade to Premium
                        </Text>
                        <Text style={[styles.cardDesc, { color: theme.subtext }]}>
                            Enjoy an Ad-Free Experience – Upgrade to Premium for Seamless Browsing
                        </Text>
                    </View>
                    <Icon.Crown size={30} color="#fbbf24" weight="fill" />
                </View>

                <TouchableOpacity style={[styles.removeAdsBtn, { borderColor: theme.border }]}>
                    <Text style={{ color: theme.text }}>Remove Ads Only</Text>
                    <Icon.MegaphoneSimple size={20} color={theme.text} />
                </TouchableOpacity>

                {settingsList.map((section, idx) => (
                    <View key={idx} style={[styles.groupBox, { backgroundColor: theme.card }]}>
                        {section.group.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.itemRow}
                                activeOpacity={item.type === 'toggle' ? 1 : 0.6}
                                onPress={() => {
                                    if (item.route) {
                                        // router.push(item.route);
                                    } else if (item.action) {
                                        item.action();
                                    }
                                }}
                            >
                                <View style={styles.iconText}>
                                    {item.icon}
                                    <Text style={[styles.itemText, { color: theme.text }]}>
                                        {item.title}
                                    </Text>
                                </View>
                                {item.type === 'toggle' ? (
                                    <Switch
                                        value={mode === 'dark'}
                                        onValueChange={toggleTheme}
                                        thumbColor={Platform.OS === 'android' ? '#fff' : undefined}
                                        trackColor={{ false: '#767577', true: theme.primary }}
                                    />
                                ) : (
                                    <Icon.CaretRight size={18} color={theme.subtext} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}



                {/* Footer */}
                <Text style={[styles.footer, { color: theme.subtext }]}>
                    © {new Date().getFullYear()} AxoTech All rights reserved.
                </Text>
            </ScrollView>
        </ScreenWrapper>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 60,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    cardDesc: {
        fontSize: 12,
        marginTop: 4,
    },
    removeAdsBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 20,
    },
    groupBox: {
        borderRadius: 10,
        paddingVertical: 4,
        marginBottom: 15,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 10,
    },
    iconText: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    itemText: {
        fontSize: 15,
    },
    restoreText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 13,
        opacity: 0.5,
    },
    footer: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 12,
    },
});
