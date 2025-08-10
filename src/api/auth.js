import { api } from './client';

export function loginApi(email, password) {
    //döndürdüğümüz zaman response için aynı çıktı olsun diye böyle return alıyoruz.
    return api.post('/login', { email, password });
}