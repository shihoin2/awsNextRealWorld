"use client"

import Image from "next/image";
import styles from "./page.module.css";
import Head from "../components/Head";
import Header from "../components/Header";
import Footer from "../components/Footer"
import Link from "next/link";
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [tagList, setTagList] = useState('');

  const createArticles = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/articles`);
      const data = await res.json();
      setTitle(data);
    } catch (error) {
      console.error('Error:', error);
      setTitle(null);
    }
  };
  useEffect(() => {
    if (title) {
      createArticles();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/articles`, {
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
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ul className="error-messages">
                <li>That article is required</li>
              </ul>
              <form method="POST" onSubmit={handleSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-control form-control-lg"
                      placeholder="Article article"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      name="summary"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className="form-control"
                      placeholder="What's this article about?"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      name="body"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={8}
                      placeholder="Write your article (in markdown)"
                      defaultValue={""}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      name="tagList"
                      value={tagList}
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
      <Footer />
    </>
  );
}
