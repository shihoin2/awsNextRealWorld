"use client"

import Image from "next/image";
import styles from "../page.module.css";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer"
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { Titillium_Web } from "next/font/google";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const id = params.id

  // const [articles, setArticles] = useState(null);
  const [articles, setArticles] = useState<{ title: string, summary: string, body: string, tagList: string } | null>(null);


  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [tagList, setTagList] = useState('');

  const fetchArticles = async () => {
    try {
      const res = await fetch(`https://osyokuzi.com/api/articles/${id}`);
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error('Error:', error);
      // setArticles(null);
      setArticles(null);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [id]);

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://osyokuzi.com/api/articles/${id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          summary: summary,
          body: body,
          tagList: tagList,
        }),
      });
      const data = await res.json();
      console.log('Article created:', data);

    } catch (error) {
      console.error('Error:', error);

    }
  }

  return (
    <>
      <Head title="Home" />
      <Header />
      {articles ? (
        <>
          <div className="editor-page">
            <div className="container page">
              <div className="row">
                <div className="col-md-10 offset-md-1 col-xs-12">
                  <ul className="error-messages">
                    <li>That article is required</li>
                  </ul>
                  <form method="PUT" onSubmit={handleSubmit}>
                    <fieldset>
                      <fieldset className="form-group">
                        <input
                          type="text"
                          name="title"
                          defaultValue={articles.title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="form-control form-control-lg"
                          placeholder="Article article"
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <input
                          type="text"
                          name="summary"
                          defaultValue={articles.summary}
                          onChange={(e) => setSummary(e.target.value)}
                          className="form-control"
                          placeholder="What's this article about?"
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <textarea
                          className="form-control"
                          name="body"
                          defaultValue={articles.body}
                          onChange={(e) => setBody(e.target.value)}
                          rows={8}
                          placeholder="Write your article (in markdown)"

                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <input
                          type="text"
                          name="tagList"
                          defaultValue={articles.tagList}
                          onChange={(e) => setTagList(e.target.value)}
                          className="form-control"
                          placeholder="Enter tags"
                        />
                        <div className="tag-list">
                          <span className="tag-default tag-pill">
                            {" "}
                            <i className="ion-close-round" /> tag{" "}
                          </span>
                        </div>
                      </fieldset>
                      <button
                        className="btn btn-lg pull-xs-right btn-primary"
                        type="submit"
                      >
                        Publish Article
                      </button>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (<div>Loading...</div>)}
      <Footer />
    </>
  );
}
