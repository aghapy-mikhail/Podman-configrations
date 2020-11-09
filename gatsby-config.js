module.exports = {
  siteMetadata: {
    title: 'Notebook',
    description: 'A Daily Journal For My IT Journey!!',
    siteUrl: 'http://blog.inputzero.me'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [
          '.mdx', '.md',
        ],
      }
    },
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Roboto Mono'
        ]
      }
    },
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-JKSGGYVPD7'
      }
    }
  ]
}
