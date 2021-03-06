import { URLSearchParams } from 'url';
import T from '../translations/strings'
import {apiUrl} from '../appConfigs/config'

export async function getStaticInfo(currentDB, currentLocale, resolvedUrl) {
    // 
    // Get list of user interface languages that are supported
    //
    const res = await fetch(apiUrl(currentDB) + 'GetUILanguages');
    const langs = await res.json();
    // 
    // Get the translated strings
    //
    const formData = new URLSearchParams();
    formData.append('category', 'StudentPortal');
    formData.append('languageCode', currentLocale);
    formData.append('data', JSON.stringify(T));
    const res2 = await fetch(apiUrl(currentDB) + 'Translate', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    });
    const Tr = await res2.json();
    //
    // Get the list of centers
    //
    const res3 = await fetch(apiUrl(currentDB) + 'CentersList');
    const centersObj = await res3.json();
    const centers = Object.entries(centersObj);

    return {props: {
                UILangs: langs, 
                DB:currentDB,
                locale:currentLocale, 
                T:Tr, 
                resolvedUrl:resolvedUrl,
                centers:centers}
            };
}