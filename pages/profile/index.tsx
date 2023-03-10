import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from './profile.module.scss'

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          訓志のブログ:プロフィール
        </title>
        <meta name="description" content="訓志のブログ:プロフィール。" />
      </Head>

      <h1>プロフィール</h1>
      <div className={styles.test}>
        fdkfjdsklaf;dfk
      </div>
    </>
  )
}

export default Profile
