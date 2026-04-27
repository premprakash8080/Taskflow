import { Injectable } from "@angular/core";
import { IsEmptyObject } from "src/app/core/utilities/common.function";

@Injectable({
    providedIn: 'root'
})

export class SessionService {
    
    public setItem(key: string, value: any): void {
        // ⬅️ String hai toh directly store karo
        if (typeof value === 'string') {
            localStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    public getItem(key: string): any {
        try {
            const raw = localStorage.getItem(key);
            if (raw === null || raw === 'null') return null;
            try {
                // ⬅️ JSON parse try karo
                const parsed = JSON.parse(raw);
                return IsEmptyObject(parsed) ? null : parsed;
            } catch {
                // ⬅️ Parse fail ho toh raw string return karo
                return raw;
            }
        } catch {
            return null;
        }
    }

    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    public clearSession(): void {
        localStorage.clear();
    }
}