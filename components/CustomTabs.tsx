import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from 'react-native-size-matters'; // Make sure this is installed
import * as Icons from 'phosphor-react-native';

export default function CustomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const tabbarIcons: any = {
          index: (isFocused: boolean) => (
            <Icons.House
              size={verticalScale(30)}
              weight={isFocused ? "fill" : "regular"}
              color={isFocused ? colors.primary : colors.neutral400}
            />
          ),
          statistics: (isFocused: boolean) => (
            <Icons.ChartBar
              size={verticalScale(30)}
              weight={isFocused ? "fill" : "regular"}
              color={isFocused ? colors.primary : colors.neutral400}
            />
          ),
          wallet: (isFocused: boolean) => (
            <Icons.Wallet
              size={verticalScale(30)}
              weight={isFocused ? "fill" : "regular"}
              color={isFocused ? colors.primary : colors.neutral400}
            />
          ),
          profile: (isFocused: boolean) => (
            <Icons.User
              size={verticalScale(30)}
              weight={isFocused ? "fill" : "regular"}
              color={isFocused ? colors.primary : colors.neutral400}
            />
          ),

        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            {
              tabbarIcons[route.name] && tabbarIcons[route.name](
                isFocused
              )
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    width: '100%',
    height: Platform.OS === 'ios' ? verticalScale(73) : verticalScale(55),
    backgroundColor: colors.neutral800,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: colors.neutral700,
    borderTopWidth: 1,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'android' ? spacingY._10 : spacingY._5, // Add margin on Android if needed
  },
  tabLabel: {
    fontSize: 14,
  },
});
