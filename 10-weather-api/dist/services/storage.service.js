var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';
const filePath = join(homedir(), 'weather-data.json');
const TOKEN_DICTIONARY = {
    token: 'token',
    cities: 'cities'
};
const saveKeyValue = (key, value) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    if (yield isExist(filePath)) {
        const file = yield promises.readFile(filePath, 'utf-8');
        data = JSON.parse(file);
    }
    data[key] = value;
    yield promises.writeFile(filePath, JSON.stringify(data));
});
const getKeyValue = (key) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield isExist(filePath)) {
        const file = yield promises.readFile(filePath, 'utf-8');
        const data = JSON.parse(file);
        return data[key];
    }
    return undefined;
});
const isExist = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield promises.stat(path);
        return true;
    }
    catch (e) {
        return false;
    }
});
export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };
