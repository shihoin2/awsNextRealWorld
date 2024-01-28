"use client"
import Image from "next/image";
import styles from "../../page.module.css";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { redirect } from "next/navigation"


export default function Home() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [articles, setArticles] = useState(null);

  const fetchArticles = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/articles/${id}`)

      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error('Error:', error);
      setArticles(null)
    }

  };

  useEffect(() => {
    fetchArticles();
  }, [id]);

  const deleteArticle = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/articles/${id}`, {
        method: 'delete',
      });
      const data = await res.json();
      console.log('Delete:', data);
      if (res.ok) {
        router.push('/');
      }
      console.log('Error!');
    } catch (error) {
      console.error('Error:', error);

    }
  }

  return (
    <>
      <Head title="Home" />
      <Header />
      {articles ? (
        <Contents articles={articles} deleteArticle={deleteArticle} />) : (<div>Loading...</div>)}
      <Footer />
    </>
  );

}



const Contents = ({ articles, deleteArticle }) => {
  const router = useRouter();
  const linkToEditor = () => {
    router.push(`/editor/${articles.article.id}`)
  }

  return (
    <>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{articles.article.title}</h1>
            <div className="article-meta">
              <Link href="/profile/eric-simons">
                <img src="http://i.imgur.com/Qr71crq.jpg" />
              </Link>
              <div className="info">
                <Link href="/profile/eric-simons" className="author">
                  {articles.article.user.name}
                </Link>
                <span className="date">{articles.article.created_at}</span>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round" />
                &nbsp; Follow {articles.article.user.name} <span className="counter">(10)</span>
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart" />
                &nbsp; Favorite Post <span className="counter">(29)</span>
              </button>
              <button onClick={linkToEditor} className="btn btn-sm btn-outline-secondary">
                <i className="ion-edit" /> Edit Article
              </button>
              <button onClick={deleteArticle} className="btn btn-sm btn-outline-danger">
                <i className="ion-trash-Link" /> Delete Article
              </button>
            </div>
          </div>
        </div>
        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>
                {articles.article.summary}
              </p>
              <h2 id="introducing-ionic">{/*Introducing RealWorld.*/}</h2>
              <p>
                {articles.article.body}
              </p>
              <ul className="tag-list">
                <li className="tag-default tag-pill tag-outline">realworld</li>
                <li className="tag-default tag-pill tag-outline">implementations</li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="article-actions">
            <div className="article-meta">
              <Link href="profile.html">
                <img src="http://i.imgur.com/Qr71crq.jpg" />
              </Link>
              <div className="info">
                <Link href="" className="author">
                  {articles.article.user.name}
                </Link>
                <span className="date">{articles.article.created_at}</span>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round" />
                &nbsp; Follow {articles.article.user.name}
              </button>
              &nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart" />
                &nbsp; Favorite Article <span className="counter">(29)</span>
              </button>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-edit" /> Edit Article
              </button>
              <button className="btn btn-sm btn-outline-danger">
                <i className="ion-trash-Link" /> Delete Article
              </button>
            </div>
          </div>
        </div>
        <CommentForm articles={articles} />
      </div>
    </>
  );
}


const Comment = ({ articles }) => {
  return (
    <>
      {articles ? (
        articles.comments.map(comment => (
          <>
            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  {comment.comment}
                </p>
              </div>
              <div className="card-footer">
                <Link href="/profile/author" className="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                  />
                </Link>
                &nbsp;
                <Link href="/profile/jacob-schmidt" className="comment-author">
                  {comment.user.name}
                </Link>
                <span className="date-posted">{comment.created_at}</span>
              </div>
            </div>
            <span className="mod-options">
              <i className="ion-trash-Link" />
            </span>
          </>
        ))) : (<div>Loading...</div>)}
    </>
  );
}

const CommentForm = ({ articles }) => {
  return (
    <>
      <div className="row">
        <div className="col-xs-12 col-md-8 offset-md-2">
          <form className="card comment-form">
            <div className="card-block">
              <textarea
                className="form-control"
                placeholder="Write Link comment..."
                rows={3}
                defaultValue={""}
              />
            </div>
            <div className="card-footer">
              <img
                src="http://i.imgur.com/Qr71crq.jpg"
                className="comment-author-img"
              />
              <button className="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>
        </div>
      </div>
      <Comment articles={articles} />
    </>
  );
}
