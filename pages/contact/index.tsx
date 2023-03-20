import type { NextPage } from 'next'
import React, { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { client } from "../../libs/client"
import SideBar from '../../components/layout/SideBar'
import styles from './Contact.module.scss'
import emailjs from '@emailjs/browser'

const Contact: NextPage<any> = ({ categories, tags }) => {
  const title = `バーコード・ブログ: お問い合わせ`
  const description = `バーコード・ブログ: お問い合わせ`

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? ''
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ''

  // const [toName, setToName] = useState('')
  // const [toEmail, setToEmail] = useState('')
  // const [message, setMessage] = useState('')

  const [mail, setMail] = useState({
    toName: '',
    toEmail: '',
    message: '',
  })

  const { toName, toEmail, message } = mail

  const sendEmail = (e: any) => {
    e.preventDefault()

    const params = {
      to_name: toName,
      to_email: toEmail,
      message: message,
    }

    emailjs.send(
      serviceId,
      templateId,
      params,
      publicKey
    )
      .then((result) => {
          console.log(result.text);
      }, (error) => {
        console.log(error.text);
        
      });
  };
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <header className={styles.hero}>
        <div className={styles.bg}>
          <h1>Contact</h1>
          <p>お問い合わせ</p>
        </div>
      </header>

      <div className="container">
        <div className="main">

          <h2 className='page_title'>
            お問い合わせ
          </h2>

          <div className={styles.contact}>
            <form onSubmit={sendEmail}>
              <table className={styles.form_table}>
                <tbody>
                  <tr>
                    <td className={styles.form_item}>
                      <label htmlFor="to_name">氏名&nbsp;<span className={styles.badge}>必須</span></label>
                    </td>
                    <td className={styles.form_body}>
                      <input type="text" name="to_name" id="to_name" placeholder="山田 太郎" />
                      <div className={styles.error} id="to_name_error">氏名を入力してください</div>
                    </td>
                  </tr>

                  <tr>
                    <td className={styles.form_item}>
                      <label htmlFor="to_email">メールアドレス&nbsp;<span className={styles.badge}>必須</span></label>
                    </td>
                    <td className={styles.form_body}>
                      <input type="text" name="to_email" id="to_email" placeholder="info@email.com" />
                      <div className={styles.error} id="to_email_error">メールアドレスを入力してください</div>
                    </td>
                  </tr>

                  <tr>
                    <td className={styles.form_item}>
                      <label>本文&nbsp;<span className={styles.badge}>必須</span></label>
                    </td>
                    <td className={styles.form_body}>
                      <textarea name="message" id="message" placeholder="問い合わせ内容・・・" />
                      <div className={styles.error} id="message_error">本文を入力してください</div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className={styles.bottun_area}>
                <input type="hidden" name="from_name" value="バーコード・ブログだよ" />
                <button type="submit" className={styles.submit_button} id="submit">
                  送信する
                </button>
              </div>

            </form>

          </div>
          
        </div>

        <SideBar categories={categories} tags={tags} />
      </div>

    </>
  )
}

export const getStaticProps = async () => {
  const categoryData = await client.get({ endpoint: "categories" })
  const tagData = await client.get({ endpoint: "tags" })

  return {
    props: {
      categories: categoryData.contents,
      tags: tagData.contents,
    },
  }
}

export default Contact
