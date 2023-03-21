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
  } = useForm<Inputs>()

  console.log('errors', errors)

  // const [formData, setFormData] = useState({
  //   toName: '',
  //   toEmail: '',
  //   message: '',
  // })

  // const { toName, toEmail, message } = formData
  console.log("watch:", watch("to_name"));

  const sendForm: SubmitHandler<Inputs> = (data) => {
    // e.preventDefault()

    const params = {
      to_name: data.to_name,
      to_email: data.to_email,
      message: data.message,
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
                          required: {
                            value: true,
                            message: '入力が必須の項目です',
                          },
                          maxLength: {
                            value: 20,
                            message: '20文字以下で入力してください',
                          },
                        })}
                      />
                      {errors.to_name?.type === 'required' && (
                        <div className={styles.error}>{ errors.to_name?.message }</div>
                      )}
                      {errors.to_name?.type === 'maxLength' && (
                        <div className={styles.error}>{ errors.to_name?.message }</div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className={styles.form_item}>
                      <label htmlFor="to_email">メールアドレス&nbsp;<span className={styles.badge}>必須</span></label>
                    </td>
                    <td className={styles.form_body}>
                      <input
                        type="text"
                        placeholder="info@email.com"
                        {...register("to_email", {
                          required: {
                            value: true,
                            message: '入力が必須の項目です',
                          },
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "メールアドレスの形式が違います"
                          },
                          maxLength: {
                            value: 150,
                            message: '150文字以下で入力してください',
                          },
                        })}
                      />
                      {errors.to_email?.type === 'required' && (
                        <div className={styles.error}>{ errors.to_email?.message }</div>
                      )}
                      {errors.to_email?.type === 'pattern' && (
                        <div className={styles.error}>{ errors.to_email?.message }</div>
                      )}
                      {errors.to_email?.type === 'maxLength' && (
                        <div className={styles.error}>{ errors.to_email?.message }</div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className={styles.form_item}>
                      <label>本文&nbsp;<span className={styles.badge}>必須</span></label>
                    </td>
                    <td className={styles.form_body}>
                      <textarea
                        placeholder="問い合わせ内容・・・"
                        {...register("message", {
                          required: {
                            value: true,
                            message: '入力が必須の項目です',
                          },
                          maxLength: {
                            value: 2000,
                            message: '2000文字以下で入力してください',
                          },
                        })}
                      />
                      {errors.message?.type === 'required' && (
                        <div className={styles.error}>{ errors.message?.message }</div>
                      )}
                      {errors.message?.type === 'maxLength' && (
                        <div className={styles.error}>{ errors.message?.message }</div>
                      )}
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
