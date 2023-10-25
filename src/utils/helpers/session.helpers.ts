import { LocalStorage } from "@utils/typings/enums/common.enums";

export const getSession = (): string | null => {
    const session = localStorage.getItem(LocalStorage.SESSION);
    return session ?? null;
};

export const handleSetSession = (session: string) => {
    localStorage.setItem(LocalStorage.SESSION, session);
};

export const handleRemoveSession = () => {
    localStorage.removeItem(LocalStorage.SESSION);
};
