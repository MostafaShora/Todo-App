import { effect, Service, signal } from '@angular/core';

@Service()
export class Theme {
    private readonly STORAGE_KEY = 'theme';

    readonly isDark = signal(
        localStorage.getItem(this.STORAGE_KEY)
            ? localStorage.getItem(this.STORAGE_KEY) === 'dark'
            : window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    constructor() {
        effect(() => {
            const dark = this.isDark();

            document.documentElement.classList.toggle('dark', dark);

            localStorage.setItem(
                this.STORAGE_KEY,
                dark ? 'dark' : 'light'
            )
        })
    }

    toggleTheme() {
        this.isDark.update(v => !v);
    }
}
