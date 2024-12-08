export interface User {
    username: string;
    email: string;
    roles: string[];
}

export const registerUser = (username: string, email: string, password: string, roles: string[]) => {
    const user: User = { username, email, roles };
    localStorage.setItem("user", JSON.stringify(user)); // Save user to localStorage (for simplicity)
};

export const loginUser = (email: string, password: string) => {
    // Here, we're assuming the email/password match
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(user);
    if (user.email === email) {
        return user; // Return user if email matches
    }
    return null;
};

export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const isLoggedIn = (): boolean => {
    return getCurrentUser() !== null;
};

export const hasRole = (role: string): boolean => {
    const userRoles = JSON.parse(localStorage.getItem("userRoles") || "[]");
    return userRoles.includes(role);
};


export const logout = () => {
    localStorage.removeItem("user");
};