/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'UCL ITT',
  tagline: 'Your one stop shop for setup, basic programming, electronic testing etc.',
  url: 'https://eal-itt.gitlab.io',
  baseUrl: '/ucl-itt-guides/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/ucl.ico',
  organizationName: 'EAL-ITT', // Usually your GitHub org/user name.
  projectName: 'UCL-ITT-Guides', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'UCL ITT ',
      logo: {
        alt: 'UCL Logo',
        src: 'img/ucl2.png',
      },
      items: [
        {
          to: 'docs/flashing-micropython-on-esp32/',
          activeBasePath: 'docs/flashing-micropython-on-esp32/',
          label: 'Guides',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Guides',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'ItsLearning',
              href: 'https://ucl.itslearning.com/Index.aspx',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/tntXwZ3Tag',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/ucl.dk/?hl=da',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Studiedokumenter ITT',
              to: 'https://www.ucl.dk/studiedokumenter/it-teknolog',
            },
            {
              label: 'GitLab Arkiv',
              href: 'https://eal-itt.gitlab.io/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
