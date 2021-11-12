import { useTranslation } from "react-i18next"

export default function Profile() {
    const { t } = useTranslation()

    return (
        <div>
            <h1>{t('Profile')}</h1>
        </div>
    )
}