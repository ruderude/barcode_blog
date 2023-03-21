import type { NextPage } from 'next'
import React, { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { client } from "../../libs/client"
import SideBar from '../../components/layout/SideBar'
import styles from './Contact.module.scss'
import emailjs from '@emailjs/browser'
import { useForm, SubmitHandler } from 'react-hook-form'

interface Inputs {
  to_name: string
  to_email: string
  message: string
}

const Contact: NextPage<any> = ({ categories, tags }) => {
  const title = `バーコード・ブログ: お問い合わせ`
  const description = `バーコード・ブログ: お問い合わせ`

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? ''
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ''

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [formData, setFormData] = useState({
    toName: '',
    toEmail: '',
    message: '',
  })

  const { toName, toEmail, message } = formData
  console.log("watch:", watch("to_name"));

  const sendForm: SubmitHandler<Inputs> = (data) => {
    console.log('sendForm')
    console.log("onSubmit:", data);
    return
    // e.preventDefault()

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
            <form onSubmit={handleSubmit(sendForm)}>
              <table className={styles.form_table}>
                <tbody>
                  <tr>
                    <td className={styles.form_item}>
                      <label htmlFor="to_name">氏名&nbsp;<span className={styles.badge}>必須</span></label>
                    </td>
                    <td className={styles.form_body}>
                      <input
                        type="text"
                        placeholder="山田 太郎"
                        {...register("to_name", {
                          required: true,
                          pattern: /^[A-Za-z]+$/i,
                          maxLength: 20,
                        })}
                      />
                      {/* {errors.to_name?.type === "required" && (
                        <span>This field is required</span>
                      )}
                      {errors.to_name?.type === "pattern" && errors.to_name?.types?.includes("pattern") && (
                        <span>Name must contain alphabets only</span>
                      )}
                      {errors.to_name?.type === "maxLength" && errors.to_name?.types?.includes("maxLength") && (
                        <span>Name must be less than or equal to 20 characters</span>
                      )} */}

                      {errors.to_name?.type === 'required' && (
                        <div className={styles.error}>必須項目です。</div>
                      )}
                      {errors.to_name?.type === 'maxLength' && (
                        <div className={styles.error}>20文字以下で入力してください。</div>
                      )}
                      {errors.to_name?.type === 'pattern' && (
                        <div className={styles.error}>アルファベットのみ入力してください。</div>
                      )}

                      {/* <ul>
                        {errors.to_name && Object.keys(errors.to_name).map(key => (
                          <li key={key}>{errors.to_name[key].message}</li>
                        ))}
                      </ul> */}
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
