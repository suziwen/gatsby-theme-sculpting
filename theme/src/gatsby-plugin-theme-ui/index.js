const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading',
  a: {
    color: 'inherit',
    textDecoration: 'none'
  }
}

export default {
  initialColorMode: 'light',
  breakpoints: ['650px', '850px', '1200px'],
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
    secondary: '#119',
    muted: '#f6f6f6',
    accent: '#609',
    gray: '#777',
    meta: '#1f7199',
    built: '#397300',
    literal: '#78A960',
    modes: {
      dark: {
        text: '#fff',
        background: '#060606',
        primary: '#3cf',
        secondary: '#e0f',
        muted: '#191919',
        gray: '#999',
        accent: '#c0f',
        meta: '#1f7199',
        built: '#397300',
        literal: '#78A960',
      },
      deep: {
        text: 'hsl(210, 50%, 96%)',
        background: 'hsl(230, 25%, 18%)',
        primary: 'hsl(260, 100%, 80%)',
        secondary: 'hsl(290, 100%, 80%)',
        accent: 'hsl(290, 100%, 80%)',
        muted: 'hsla(230, 20%, 0%, 20%)',
        gray: 'hsl(210, 50%, 60%)',
        meta: '#1f7199',
        built: '#397300',
        literal: '#78A960',
      },
      swiss: {
        text: 'hsl(10, 20%, 20%)',
        background: 'hsl(10, 10%, 98%)',
        primary: 'hsl(10, 80%, 50%)',
        secondary: 'hsl(10, 60%, 50%)',
        accent: 'hsl(250, 60%, 30%)',
        muted: 'hsl(10, 20%, 94%)',
        gray: 'hsl(10, 20%, 50%)',
        meta: '#1f7199',
        built: '#397300',
        literal: '#78A960',
      },
    },
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
    english: 'oswald, sans-serif',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: '400',
    heading: '700',
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  textStyles: {
    heading,
    display: {
      variant: 'textStyles.heading',
      fontSize: [5, 6, 7],
      mt: 3,
    },
  },
  buttons: {
    secondary: {
      cursor: 'pointer',
    },
  },
  styles: {
    Container: {
      p: 3,
      maxWidth: 1024,
    },
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      variant: 'textStyles.display',
    },
    h2: {
      variant: 'textStyles.heading',
      fontSize: 5,
    },
    h3: {
      variant: 'textStyles.heading',
      fontSize: 4,
    },
    h4: {
      variant: 'textStyles.heading',
      fontSize: 3,
    },
    h5: {
      variant: 'textStyles.heading',
      fontSize: 2,
    },
    h6: {
      variant: 'textStyles.heading',
      fontSize: 1,
    },
    a: {
      color: 'primary',
      '&:hover': {
        color: 'secondary',
      },
    },
    code: {
      fontFamily: 'monospace',
      color: 'secondary',
      fontSize: 1,
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'secondary',
      bg: 'muted',
    },
    table: {
      width: '100%',
      my: 4,
      borderCollapse: 'separate',
      borderSpacing: 0,
      [['th', 'td']]: {
        textAlign: 'left',
        py: '4px',
        pr: '4px',
        pl: 0,
        borderColor: 'muted',
        borderBottomStyle: 'solid',
      },
    },
    th: {
      verticalAlign: 'bottom',
      borderBottomWidth: '2px',
    },
    td: {
      verticalAlign: 'top',
      borderBottomWidth: '1px',
    },
    hr: {
      border: 0,
      borderBottom: '1px solid',
      borderColor: 'muted',
    },
    img: {
      maxWidth: '100%'
    },
    '.hljs': {
      color: 'text',
      bg: 'muted',
      [['.hljs-subst']]: {
        color: 'text'
      },
      [['.hljs-comment']]: {
        color: 'gray'
      },
      [['.hljs-keyword','.hljs-attribute','.hljs-selector-tag','.hljs-meta-keyword','.hljs-doctag','.hljs-name']]: {
          fontWeight: 'bold'
      },
      [['.hljs-type','.hljs-string','.hljs-number','.hljs-selector-id','.hljs-selector-class','.hljs-quote','.hljs-template-tag','.hljs-deletion']]: {
          color: 'primary'
      },
      [['.hljs-title','.hljs-section']]: {
          color: 'primary',
          fontWeight: 'bold'
      },
      [['.hljs-regexp','.hljs-symbol','.hljs-variable','.hljs-template-variable','.hljs-link','.hljs-selector-attr','.hljs-selector-pseudo']]: {
          color: 'secondary'
      },
      [['.hljs-literal']]: {
          color: 'literal'
      },
      [['.hljs-built_in','.hljs-bullet','.hljs-code','.hljs-addition']]: {
          color: 'built'
      },
      [['.hljs-meta']]: {
          color: 'meta'
      },
      [['.hljs-meta-string']]: {
          color: 'accent'
      },
      [['.hljs-emphasis']]: {
          fontStyle: 'italic'
      },
      [['.hljs-strong']]: {
          fontWeight: 'bold'
      }

    }
  }
}

