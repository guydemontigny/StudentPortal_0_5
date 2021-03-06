import Head from 'next/head'

const PagesContainer = ({T}) => {
    return(
        <div>
            <Head>
                <title >0-51{' '}{T.StudentPortalHead}</title>
                <link rel="icon" type="image/gif" href="/img/Wheel2-blue-gold.gif" />
            </Head>
        </div>
    )
}

export default PagesContainer