import { Service, signal } from '@angular/core';
import { Toast, ToastType } from '../models/toast.model';

@Service()
export class ToastService {
    readonly toasts = signal<Toast[]>([]);

    show(
        title: string,
        message: string,
        type: ToastType = 'success',
        duration = 3000
    ) {

        const toast: Toast = {
            id: Date.now(),
            title,
            message,
            type,
            duration
        };

        this.toasts.update(t => [...t, toast]);

        setTimeout(() => {
            this.remove(toast.id);
        }, duration);

    }

    remove(id: number) {
        this.toasts.update(t =>
            t.filter(x => x.id !== id)
        );
    }
}
