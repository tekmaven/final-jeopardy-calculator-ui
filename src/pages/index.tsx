import * as React from 'react';
import { RouterProps } from '@reach/router';

import Layout from '../components/layout';
import Calculator from '../components/calculator'
import GitHubForkRibbon from 'react-github-fork-ribbon'

//<a href="https://github.com/tekmaven/final-jeopardy-calculator-ui" bannerColor="#101E94" />
const IndexPage: React.SFC<RouterProps> = ({ location }) => (
  <Layout location={location}>
    <Calculator id="asd" />
    <GitHubForkRibbon href="https://github.com/tekmaven/final-jeopardy-calculator-ui" color="red">
      Fork me on GitHub
    </GitHubForkRibbon>
  </Layout>
);

export default IndexPage;
