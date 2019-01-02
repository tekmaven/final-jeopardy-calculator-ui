import * as React from 'react';
import Helmet from 'react-helmet';
import { RouterProps } from '@reach/router';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';

import Header from './header';
import './layout.css';
import { LayoutQueryData } from '../interfaces/LayoutQuery.interface';

interface ThemeProps {
  colorPrimary: string;
}

const theme: ThemeProps = {
  colorPrimary: '#101E94',
};

const MainLayout = styled.main`
  max-width: 95%;
  margin: 1rem auto;
`;

type LayoutProps = React.ReactNode & RouterProps;

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            # change siteMetaData in 'gatsby-config.js'
            title
            description
            keywords
          }
        }
      }
    `}
    render={({ site }: LayoutQueryData) => {
      const { title, description, keywords } = site.siteMetadata;

      return (
        <ThemeProvider theme={theme}>
          <>
            <Helmet
              title={title}
              meta={[
                { name: 'description', content: description },
                { name: 'keywords', content: keywords || 'keywords' },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <Header siteTitle={title} />
            <MainLayout>
              <div>{children}</div>
            </MainLayout>
          </>
        </ThemeProvider>
      );
    }}
  />
);

export default Layout;
