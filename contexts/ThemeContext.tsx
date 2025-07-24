import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { darkColors, lightColors } from "@/constants/themec";

export type ThemeMode = "light" | "dark";

export interface ThemeContextType {
    theme: typeof lightColors;
    mode: ThemeMode;
    toggleTheme: () => void;
}


const ThemeContext = createContext<ThemeContextType>({
    theme: lightColors,
    mode: "light",
    toggleTheme: () => { },
});

const STORAGE_KEY = "@app_theme_mode";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const deviceColorScheme = useColorScheme();
    const [mode, setMode] = useState<ThemeMode>("light");
    const [isReady, setIsReady] = useState(false); // avoid rendering before loading

    const loadStoredMode = async () => {
        try {
            const savedMode = await AsyncStorage.getItem(STORAGE_KEY);
            if (savedMode === "dark" || savedMode === "light") {
                setMode(savedMode);
            } else {
                // fallback to system setting
                setMode(deviceColorScheme === "dark" ? "dark" : "light");
            }
        } catch (e) {
            setMode(deviceColorScheme === "dark" ? "dark" : "light");
        } finally {
            setIsReady(true);
        }
    };

    const toggleTheme = async () => {
        const newMode = mode === "dark" ? "light" : "dark";
        setMode(newMode);
        await AsyncStorage.setItem(STORAGE_KEY, newMode);
    };

    useEffect(() => {
        loadStoredMode();
    }, []);

    const theme = mode === "dark" ? darkColors : lightColors;

    if (!isReady) return null; // Optional: show splash or fallback

    return (
        <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
