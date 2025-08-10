import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from 'react-native-size-matters'
import Header from '@/components/Header'
import { useAuth } from '@/contexts/authContext'
import Typo from '@/components/Typo'
import { Image } from 'expo-image'
import { getProfileImage } from '@/services/imageService'
import { accountOptionType } from '@/types'
import * as Icons from 'phosphor-react-native'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useRouter } from 'expo-router'

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();
<<<<<<< HEAD
=======
  const { theme } = useTheme();
>>>>>>> 940d709 (Update Code)

  const accountOptions: accountOptionType[] = [
    {
      title: "Edit Profile",
<<<<<<< HEAD
      icon: <Icons.User size={26} color={colors.white} weight="fill" />,
=======
      icon: <Icons.User size={26} color={theme.white || '#fff'} weight="fill" />,
>>>>>>> 940d709 (Update Code)
      routeName: '/(modals)/profileModal',
      bgColor: '#6366f1',
    },
    {
      title: "Settings",
<<<<<<< HEAD
      icon: <Icons.GearSix size={26} color={colors.white} weight="fill" />,
      routeName: '/settings',
=======
      icon: <Icons.GearSix size={26} color={theme.white || '#fff'} weight="fill" />,
      routeName: '/(modals)/settingModal',
>>>>>>> 940d709 (Update Code)
      bgColor: '#059669',
    },
    {
      title: "Privacy Policy",
<<<<<<< HEAD
      icon: <Icons.Lock size={26} color={colors.white} weight="fill" />,
      routeName: '/privacy',
      bgColor: colors.neutral600,
    },
    {
      title: "Logout",
      icon: <Icons.Power size={26} color={colors.white} weight="fill" />,
      routeName: '/logout',
      bgColor: '#e11d48',
    },
  ]

  const handleLogout = async () => {
    await signOut(auth);
  }

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to logout? ", [
      {
        text: "Cancel",
        style: 'cancel'
      },
      {
        text: "Logout",
        onPress: () => handleLogout(),
        style: 'destructive'
      }

    ])
  }

  const handlePress = (item: accountOptionType) => {
    if (item.title == 'Logout') {
      showLogoutAlert();
    }

    if (item.routeName) router.push(item.routeName)

  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title='Profile' />

        <View style={styles.userInfo}>
          <View>
            <Image
              source={getProfileImage(user?.image)}
              style={styles.avatar}
              contentFit='cover'
              transition={100}
            />
          </View>

          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight='600' color={colors.neutral100}>
              {user?.name}
            </Typo>
            <Typo size={15} color={colors.neutral400}>
=======
      icon: <Icons.Lock size={26} color={theme.white || '#fff'} weight="fill" />,
      routeName: '',
      bgColor: theme.neutral600,
    },
    {
      title: "Logout",
      icon: <Icons.Power size={26} color={theme.white || '#fff'} weight="fill" />,
      routeName: '',
      bgColor: '#e11d48',
    },
  ];

  const handleLogout = async () => {
    await signOut(auth);
  };

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
      { text: "Cancel", style: 'cancel' },
      { text: "Logout", onPress: () => handleLogout(), style: 'destructive' }
    ]);
  };

  const handlePress = (item: accountOptionType) => {
    if (item.title === 'Logout') {
      showLogoutAlert();
    } else if (item.routeName) {
      router.push(item.routeName);
    }
  };

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title='Profile' />

        <View style={styles.userInfo}>
          <Image
            source={getProfileImage(user?.image)}
            style={[styles.avatar, { backgroundColor: theme.neutral300 }]}
            contentFit='cover'
            transition={100}
          />

          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight='600' color={theme.text}>
              {user?.name}
            </Typo>
            <Typo size={15} color={theme.textLight}>
>>>>>>> 940d709 (Update Code)
              {user?.email}
            </Typo>
          </View>
        </View>

        {/* account options */}
        <View style={styles.accountOptions}>
<<<<<<< HEAD
          {accountOptions.map((item, index) => {
            return (
              <Animated.View entering={FadeInDown.delay(index * 50).springify().damping(14)} style={styles.listItem} key={index}>
                <TouchableOpacity style={styles.flexRow} onPress={() => handlePress(item)}>
                  {/* icon */}
                  <View
                    style={[
                      styles.listIcon,
                      { backgroundColor: item?.bgColor }
                    ]}
                  >
                    {item.icon && item.icon}
                  </View>

                  <Typo size={16} style={{ flex: 1 }} fontWeight={"500"}>
                    {item.title}
                  </Typo>

                  <Icons.CaretRight
                    size={verticalScale(20)}
                    weight="bold"
                    color={colors.white}
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Profile
=======
          {accountOptions.map((item, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(index * 50).springify().damping(14)}
              style={styles.listItem}
            >
              <TouchableOpacity style={styles.flexRow} onPress={() => handlePress(item)}>
                <View style={[styles.listIcon, { backgroundColor: item.bgColor }]}>
                  {item.icon}
                </View>

                <Typo size={16} style={{ flex: 1 }} fontWeight={"500"} color={theme.text}>
                  {item.title}
                </Typo>

                <Icons.CaretRight
                  size={verticalScale(20)}
                  weight="bold"
                  color={theme.text}
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;
>>>>>>> 940d709 (Update Code)

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    paddingHorizontal: spacingX._5,
=======
    paddingHorizontal: spacingX._20,
>>>>>>> 940d709 (Update Code)
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: 'center',
    gap: spacingY._15,
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
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: 'center',
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius._15,
    borderCurve: 'continuous',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10,
  },
<<<<<<< HEAD
})
=======
});
>>>>>>> 940d709 (Update Code)
