import React from 'react';
import { Tabs } from 'expo-router';
import CustomTabs from '@/components/CustomTabs';
import { useTheme } from '@/contexts/ThemeContext';

const _layout = () => {
  const { mode } = useTheme(); // 👈 Extract mode here to force rerender when theme changes

  return (
    <Tabs
      key={mode} // 👈 force full rerender on dark/light toggle
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabs {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="statistics" options={{ title: 'Statistic' }} />
      <Tabs.Screen name="wallet" options={{ title: 'Wallet' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
};

export default _layout;
