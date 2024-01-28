
"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer"
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useRouter, useSearchParams } from 'next/navigation';
import { PagesRouteModule } from "next/dist/server/future/route-modules/pages/module.compiled";




export default function Home() {
  const [articles, setArticles] = useState(null);
  const [pageData, setPageData] = useState(null);

  const searchParams = useSearchParams()
  const page = searchParams.get('page')

  const fetchArticles = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/articles?page=${page}`)
      const data = await res.json();
      console.log(data);
      setArticles(data);
      console.log(data);
      setPageData(data);
      console.log(data);

    } catch (error) {
      console.error('Error:', error);
    }

  };

  useEffect(() => {
    fetchArticles();
  }, [page]);

  return (
    <>
      <Head title="Home" />
      <Header />
      <PageTop />
      {articles ? (
        articles.data.map(article => (
          <Contents key={article.id} article={article} />
        ))) : (<div>Loading...</div>)}
      {pageData ? (<Pagination key={pageData.data.id} pageData={pageData} setPageData={setPageData}  />
      ) : (<div>Loading...</div>)}
      <Footer />
    </>
  );
}

const Contents = ({ article }) => {
  return (
    <>
      <div className="article-preview">
        <div className="article-meta">
          <Link href="/profile/{user_name}">
            <img src="http://i.imgur.com/Qr71crq.jpg" />
          </Link>
          <div className="info">
            <Link href="/profile/{user_name}" className="author">
              {article.user.name}
            </Link>
            <span className="date">{article.created_at}</span>
          </div>
          <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart" /> 29
          </button>
        </div>
        <Link
          href={`/article/${article.id}`}
          className="preview-link"
        >
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
          <span>Read more...</span>
          <ul className="tag-list">
            <li className="tag-default tag-pill tag-outline">{article.tagList}</li>
          </ul>
        </Link>
      </div>

    </>
  );
}

const PageTop = () => {
  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link" href="">
                      Your Feed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}


const Pagination = ({pageData, setPageData}) => {
   const fetchPage = async (url) => {
    try {
      const res = await fetch(url);
    const data = await res.json();
    setPageData(data);

  } catch (error) {
    console.error('Error:', error);

  }
    }


  return(
    <>
      <div>
        <ul className="pagination">
          {pageData.links.map(link => (
            <li key={link.label} className={`page-item ${link.active ? 'active' : ''}`}>
              {link.url ? (
                <Link className="page-link" href="#" onClick={() => fetchPage(link.url)}>
                  {link.label}
                </Link>
              ) : (
                <span className="page-link">{link.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-3">
        <div className="sidebar">
          <p>Popular Tags</p>
          <div className="tag-list">
            <Link href="" className="tag-pill tag-default">
              programming
            </Link>
            <Link href="" className="tag-pill tag-default">
              javascript
            </Link>
            <Link href="" className="tag-pill tag-default">
              emberjs
            </Link>
            <Link href="" className="tag-pill tag-default">
              angularjs
            </Link>
            <Link href="" className="tag-pill tag-default">
              react
            </Link>
            <Link href="" className="tag-pill tag-default">
              mean
            </Link>
            <Link href="" className="tag-pill tag-default">
              node
            </Link>
            <Link href="" className="tag-pill tag-default">
              rails
            </Link>
          </div>
        </div>
      </div>
      </>

    );
}
