import Head from "next/head"
import styles from "../styles/Layout.module.css"

export default function Layout({children}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>BMR calculator</title>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" href="css/uikit.min.css" />
                <script src="js/uikit.min.js"></script>
                <script src="js/uikit-icons.min.js"></script>
            </Head>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}
