"use client"
import Link from 'next/link'

export default function Pagination({ pageData }) {
  return(
    <>
      <div>
        <ul className="pagination">
          {pageData.links.map(link => (
            <li key={link.label} className={`page-item ${link.active ? 'active' : ''}`}>
              {link.url ? (
                <Link href={link.url}>
                  <a className="page-link">{link.label}</a>
                </Link>
              ) : (
                <span className="page-link">{link.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      </>
    );
}
