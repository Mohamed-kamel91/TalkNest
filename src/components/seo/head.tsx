import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';

import { env } from '@/config/env';

type HeadProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

const DEFAULT_TITLE = 'TalkNest';
const DEFAULT_DESC = 'Connect, share, and be part of the nest.';
const DEFAULT_IMAGE = '/og-image.jpg';
const SITE_NAME = env.APP_NAME;
const APP_URL = env.APP_URL;

export const Head = ({
  title = '',
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
}: HeadProps = {}) => {
  const location = useLocation();

  const url = `${APP_URL}${location.pathname}${location.search}`;
  const headTitle = title ? `${title} | TalkNest` : DEFAULT_TITLE;

  return (
    <Helmet title={headTitle} defaultTitle={DEFAULT_TITLE}>
      {/* Basic SEO */}
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={headTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
