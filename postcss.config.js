/*global module, process*/
/*eslint no-undef: "error"*/
module.exports = {
    plugins: [
      ...(process.env.NODE_ENV === 'production' ? [
        "postcss-flexbugs-fixes",
        [
          "postcss-preset-env",
          {
            "autoprefixer": {
              "flexbox": "no-2009"
            },
            "stage": 3,
            "features": {
              "custom-properties": false
            }
          }
        ],
        [
          '@fullhuman/postcss-purgecss',
          {
            content: [
                './pages/**/*.{js,jsx,ts,tsx}',
                './components/**/*.{js,jsx,ts,tsx}'
            ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: ["body","badge","m-2","mt-3","mb-4","me-2","html",]
          }
        ],
      ] 
      : [])
    ]
  };
  