"use client"
import Link from 'next/link'

export default function Pagination({ pageData }:{pageData:any}) {
  return(
    <>
      <div>
        <ul className="pagination">
          {pageData.links.map((link:any) => (
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
