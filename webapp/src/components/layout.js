/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import { FaWhatsapp, FaSearch, FaYoutube } from "react-icons/fa"

const Layout = ({ children, songText = false, link }) => {
  const whatsappLink = `https://wa.me/?text=${songText}`
  return (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `}
      render={data => (
        <>
          <div className={"main" + (songText ? " song" : "")}>
            <main>{children}</main>
          </div>
          <footer>
            {songText &&
              <>
                <div className="link">
                  <Link to="/"><FaSearch /></Link>
                </div>
                <div className="link">
                  <a href={whatsappLink}><FaWhatsapp /></a>
                </div>
                {link &&
                  <div className="link">
                    <a href={link} target="_blank"><FaYoutube /></a>
                  </div>
                }
              </>
            }
            <div className="copyright">
              © {new Date().getFullYear()} {/*data.site.siteMetadata.author*/}
            </div>
          </footer>
        </>
      )}
    />
  )
}

export default Layout
