import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeContext";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Script from "next/script";


const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Evoke Creators - Transforming Digital Experiences",
  description:
    "Evoke Creators specializes in cutting-edge digital solutions, crafting user-friendly and innovative software to enhance business efficiency and user experience.",
  keywords:
    "Evoke Creators, digital transformation, software development, UI/UX design, business solutions, web development, innovative software",
  author: "Evoke Creators Team",
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="viewport" content={metadata.viewport} />
        <meta name="robots" content={metadata.robots} />
        <meta name="google-adsense-account" content="ca-pub-3181101372638451"></meta>
      </head>
      <body
        className={`${roboto.variable} ${roboto.className} antialiased bg-light`}
      >
        {/* AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3181101372638451"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9P5LRMCWZS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9P5LRMCWZS');
          `}
        </Script>

        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
