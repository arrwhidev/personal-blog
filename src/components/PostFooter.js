import React from 'react'
import { Link } from 'gatsby'
import Bio from './Bio'

function renderNext(next) {
  if (next) {
    return (
      <Link to={next.fields.slug} rel="next">
        {next.frontmatter.title} →
      </Link>
    )
  }

  return (
    <Link to="/" rel="home">
      Home →
    </Link>
  )
}

function renderPrev(prev) {
  if (prev) {
    return (
      <Link to={prev.fields.slug} rel="prev">
        ← {prev.frontmatter.title}
      </Link>
    )
  }

  return (
    <Link to="/" rel="home">
      ← Home
    </Link>
  )
}

export default ({ next, previous }) => {
  return (
    <div
      className="main-content"
      style={{
        paddingTop: '20px',
      }}
    >
      <hr style={{ width: '100%' }} />
      <Bio />
      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          paddingTop: '10px',
          marginLeft: 0
        }}
      >
        <li>{renderPrev(previous)}</li>
        <li>{renderNext(next)}</li>
      </ul>
    </div>
  )
}
