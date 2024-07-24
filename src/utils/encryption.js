import { SignJWT, jwtVerify } from 'jose';
import { hash } from 'bcrypt';

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1 week')
        .sign(key);
}

export async function decrypt(input) {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    });
    return payload;
}

export async function hashPasswords(password) {
    return await hash(password, 10);
}
