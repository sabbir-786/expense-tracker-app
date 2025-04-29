// contexts/authContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "@/config/firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userData: UserType = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName || "",
                    image: null,
                };
                setUser(userData);
                updateUserData(firebaseUser.uid)

                router.replace("/(tabs)");
            } else {
                setUser(null);
                router.replace("/(auth)/welcome");
            }
        });

        return () => unsub();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            await updateUserData(res.user.uid);
            return { success: true };
        } catch (error: any) {
            let msg = "Login failed";
            if (error.code === "auth/invalid-credential") msg = "Incorrect Password.";
            else if (error.code === "auth/user-not-found") msg = "No account found with this email.";
            else if (error.code === "auth/wrong-password") msg = "Incorrect password.";
            else if (error.code === "auth/too-many-requests") msg = "Too many attempts. Try again later.";

            return { success: false, msg };
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const uid = res.user.uid;

            await setDoc(doc(firestore, "users", uid), {
                uid,
                email,
                name,
                image: null,
            });

            await updateUserData(uid);
            return { success: true };
        } catch (error: any) {
            const msg = error.message || "Registration failed";
            console.error("Registration Error:", msg);
            return { success: false, msg };
        }
    };

    const updateUserData = async (uid: string) => {
        try {
            const docRef = doc(firestore, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const userData: UserType = {
                    uid: data.uid ?? "",
                    email: data.email ?? "",
                    name: data.name ?? "",
                    image: data.image ?? null,
                };
                setUser({ ...userData });
            }
        } catch (error: any) {
            console.error("Failed to fetch user data:", error.message);
        }
    };

    const contextValue: AuthContextType = {
        user,
        setUser,
        login,
        register,
        updateUserData,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
