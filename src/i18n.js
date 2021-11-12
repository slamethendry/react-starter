import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        resources: {
            en: { translation: require('./i18n/en.json') }, // translation is the default namespace
            ja: { translation: require('./i18n/ja.json') },
            id: { translation: require('./i18n/id.json') }
        },
        debug: true,
        interpolation: { escapeValue: false },
    })

i18n.languages = ['en', 'id', 'ja']

export default i18n

export function Language() {
    const { i18n } = useTranslation()

    return (
        <div>
            <button className='flag' onClick={() => i18n.changeLanguage('id')}>🇲🇨</button>
            <button className='flag' onClick={() => i18n.changeLanguage('ja')}>🇯🇵</button>
            <button className='flag' onClick={() => i18n.changeLanguage('en')}>🇬🇧</button>
        </div>
    )
}