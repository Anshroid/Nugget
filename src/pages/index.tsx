import Head from 'next/head'
import App from "@/components/App";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/components/theme";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nugget Control Panel</title>
        <meta name="description" content="Nugget's webserver control panel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
      </main>
    </>
  )
}
