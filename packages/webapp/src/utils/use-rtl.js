import { useTranslation } from "react-i18next";

const RTL_LANGUAGES = ['ar']
const useRtl = () => {
    const { i18n: { language } } = useTranslation()
    const isRtl = RTL_LANGUAGES.includes(language)
    return {
        isRtl,
        direction: isRtl ? 'rtl' : 'lfr'
    }
}

export default useRtl