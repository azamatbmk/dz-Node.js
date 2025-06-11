import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath: string = join(homedir(), 'weather-data.json');

interface ITOKEN_DICTIONARY {
    token: string;
    cities: string;
}

const TOKEN_DICTIONARY: ITOKEN_DICTIONARY = {
    token: 'token',
    cities: 'cities'
}

const saveKeyValue = async (key: string, value: string | string[]) => {
    let data: {[key: string]: string | string[]} = {};

    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath, 'utf-8');
        data = JSON.parse(file);
    }
    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data))
};

const getKeyValue = async (key: string) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath, 'utf-8');
        const data = JSON.parse(file);
        return data[key];
    }
    return undefined;
};

const isExist = async (path: string) => {
    try {
        await promises.stat(path);
        return true;
    } catch (e) {
        return false;
    }
}

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };