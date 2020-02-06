import Typography from "typography"

const typography = new Typography({
    googleFonts: [
        {
            name: "El Messiri",
            styles: [
                '600',
            ],
        },
        {
            name: "Harmattan",
            styles: [
                '400',
            ],
        },
    ],
    baseFontSize: "28px",
    baseLineHeight: 1.666,
    headerFontFamily: ["El Messiri", "serif"],
    bodyFontFamily: ["Harmattan", "sans-serif"],
})

export default typography