import React from 'react'
import Head from 'next/head'
import { getBrowserLocale } from '../../translations/getBrowserLocale'
import { useRouter } from 'next/dist/client/router'

const Index = (props) => {
  const router = useRouter();
  React.useEffect(() => {
    router.replace('/[DB]/[uiLang]', `/${props.DB}/${getBrowserLocale()}`)
  })
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  )
}

export default Index

export async function getServerSideProps(props){
  const db = props.query.DB
  return {props: {DB: db}}
 }