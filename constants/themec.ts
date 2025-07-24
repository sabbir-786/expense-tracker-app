export const lightColors = {
    background: "#ffffff",
    text: "#000000",
    textLight: "#404040",
    textLighter: "#737373",
    primary: "#a3e635",
    white: "#ffffff",
    black: "#000000",
    rose: "#ef4444",
    green: "#16a34a",
    neutral50: "#fafafa",
    neutral100: "#f5f5f5",
    neutral200: "#e5e5e5",
    neutral300: "#d4d4d4",
    neutral350: "#CCCCCC",
    neutral400: "#a3a3a3",
    neutral500: "#737373",
    neutral600: "#525252",
    neutral700: "#404040",
    neutral800: "#262626",
    neutral900: "#f0f0f0",
    mutedText: '#6B7280',
    errorText: '#ff4d4f',
    accent: '#ff9900', // ✅ add this

    buttonText: '#ffffff',   // or a contrasting color depending on button bg
    placeholder: '#888',
    link: '#5EA2F2',
    inputBackground: '#FFFFFF',
    border: '#DDDDDD',
    // ✅ Add this
    card: "#f9f9f9", // light gray card background
    subtext: '#666',
};

export const darkColors: typeof lightColors = {
    ...lightColors,
    background: "#171717",
    text: "#ffffff",
    textLight: "#d4d4d4",
    textLighter: "#a3a3a3",
    neutral900: "#171717",
    mutedText: '#9CA3AF',
    errorText: '#ff6b6b',
    accent: '#ffb84d',


    // ✅ Add this
    card: "#262626", // dark card background
};
