<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'

const Statistics = () => {
    return (
        <ScreenWrapper>
            <Text>Statistics</Text>
        </ScreenWrapper>
    )
}

export default Statistics

const styles = StyleSheet.create({})
=======
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import { scale, verticalScale } from '@/utils/styling';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import Header from '@/components/Header';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { BarChart } from 'react-native-gifted-charts';
import Loading from '@/components/Loading';
import { useAuth } from '@/contexts/authContext';
import { fetchMonthlyStats, fetchWeeklyStats, fetchYearlyStats } from '@/services/transactionService';
import TransactionList from '@/components/TransactionList';
import { ChartDataItem, TransactionType } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';

const Statistics = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { user } = useAuth();
    const { theme } = useTheme(); // ✅ Get current theme

    const [chartData, setChartData] = useState<ChartDataItem[]>([]);
    const [chartLoading, setChartLoading] = useState(false);
    const [transaction, setTransaction] = useState<TransactionType[]>([]);

    useEffect(() => {
        if (activeIndex == 0) getWeeklyStats();
        if (activeIndex == 1) getMonthlyStats();
        if (activeIndex == 2) getYearlyStats();
    }, [activeIndex]);

    const getWeeklyStats = async () => {
        try {
            setChartLoading(true);
            if (!user?.uid) throw new Error('User not authenticated');
            const res = await fetchWeeklyStats(user.uid);
            setChartLoading(false);

            if (res.success) {
                setChartData(res?.data?.stats ?? []);
                setTransaction(res?.data?.transactions ?? []);
            } else {
                Alert.alert('Error', 'Failed to fetch stats');
            }
        } catch (error: any) {
            setChartLoading(false);
            Alert.alert('Error', error.message || 'Something went wrong');
        }
    };

    const getMonthlyStats = async () => {
        try {
            setChartLoading(true);
            if (!user?.uid) throw new Error('User not authenticated');
            const res = await fetchMonthlyStats(user.uid);
            setChartLoading(false);

            if (res.success) {
                setChartData(res?.data?.stats ?? []);
                setTransaction(res?.data?.transactions ?? []);
            } else {
                Alert.alert('Error', 'Failed to fetch stats');
            }
        } catch (error: any) {
            setChartLoading(false);
            Alert.alert('Error', error.message || 'Something went wrong');
        }
    };

    const getYearlyStats = async () => {
        try {
            setChartLoading(true);
            if (!user?.uid) throw new Error('User not authenticated');
            const res = await fetchYearlyStats(user.uid);
            setChartLoading(false);

            if (res.success) {
                setChartData(res?.data?.stats ?? []);
                setTransaction(res?.data?.transactions ?? []);
            } else {
                Alert.alert('Error', 'Failed to fetch stats');
            }
        } catch (error: any) {
            setChartLoading(false);
            Alert.alert('Error', error.message || 'Something went wrong');
        }
    };

    return (
        <ScreenWrapper>
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <View style={styles.header}>
                    <Header title="Statistics" />
                </View>

                <ScrollView
                    contentContainerStyle={{
                        gap: spacingY._20,
                        paddingTop: spacingY._5,
                        paddingBottom: verticalScale(100),
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <SegmentedControl
                        values={['Weekly', 'Monthly', 'Yearly']}
                        selectedIndex={activeIndex}
                        onChange={(event) => {
                            setActiveIndex(event.nativeEvent.selectedSegmentIndex);
                        }}
                        tintColor={theme.card}
                        backgroundColor={theme.background}
                        appearance="dark"
                        activeFontStyle={styles.segmentFontStyle}
                        style={styles.segmentStyle}
                        fontStyle={{ ...styles.segmentFontStyle, color: theme.mutedText || colors.neutral400 }}
                    />

                    <View style={styles.chartContainer}>
                        {Array.isArray(chartData) && chartData.length > 0 ? (
                            <BarChart
                                data={chartData}
                                barWidth={scale(12)}
                                spacing={[1, 2].includes(activeIndex) ? scale(25) : scale(16)}
                                roundedTop
                                roundedBottom
                                hideRules
                                yAxisLabelPrefix="₹"
                                frontColor={colors.primary}
                                xAxisThickness={0}
                                yAxisThickness={0}
                                yAxisLabelWidth={[1, 2].includes(activeIndex) ? scale(38) : scale(35)}
                                yAxisTextStyle={{ color: theme.mutedText || colors.neutral400 }}
                                xAxisLabelTextStyle={{
                                    color: theme.text,
                                    fontSize: verticalScale(12),
                                }}
                                noOfSections={3}
                                minHeight={5}
                            />
                        ) : (
                            <View style={[styles.noChart, { backgroundColor: theme.card + '99' }]} />
                        )}

                        {chartLoading && (
                            <View style={styles.chartLoadingContainer}>
                                <Loading />
                            </View>
                        )}
                    </View>

                    <TransactionList
                        title="Transactions"
                        emptyListMessage="No Transaction Found"
                        data={transaction}
                    />
                </ScrollView>
            </View>
        </ScreenWrapper>
    );
};

export default Statistics;

const styles = StyleSheet.create({
    chartContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartLoadingContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: radius._12,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    header: {},
    noChart: {
        height: verticalScale(210),
        width: '100%',
        borderRadius: radius._10,
    },
    searchIcon: {
        backgroundColor: colors.neutral700,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        height: verticalScale(35),
        width: verticalScale(35),
        borderCurve: 'continuous',
    },
    segmentStyle: {
        height: scale(37),
    },
    segmentFontStyle: {
        fontSize: verticalScale(13),
        fontWeight: 'bold',
    },
    container: {
        paddingHorizontal: spacingX._20,
        paddingVertical: spacingY._5,
        gap: spacingY._10,
        flex: 1,
    },
});
>>>>>>> 940d709 (Update Code)
