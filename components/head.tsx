import NextHead from 'next/head'
import React from 'react'

interface Props {
    title?: string
}

const Head = ({title="FRONT"}:Props):React.ReactElement=>(
    <NextHead>
        <meta name='application-name' content='Front' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Front' />
        <meta name='description' content='Front' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='theme-color' content='#fff' />

        <link rel='apple-touch-icon' href='/512.webp' />
        <link rel='apple-touch-icon' sizes='512x512' href='/512.webp' />
        <link rel='icon' type='image/webp' sizes='64x64' href='/64.webp' />
        <link rel='icon' type='image/webp' sizes='128x128' href='/128.webp' />

        <link rel='manifest' href='/manifest.json' />

        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel="stylesheet" href="/./toastify.css"/>

        <title>{title}</title>

    </NextHead>
)

export default Head