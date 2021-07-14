import Document, { DocumentContext,Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
  render():React.ReactElement{
    return (
        <Html lang="en-US">
          <Head />
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
  }
}

export default MyDocument