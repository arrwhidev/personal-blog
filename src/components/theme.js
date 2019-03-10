var colors = {
  // char: "red",
  // operator: "red",
  // tag: "red",
  punctuation: '#969696',
  comment: '#969696',
  keyword: '#34febb',
  primitive: '#34febb',
  string: '#34febb',
  variable: '#32ae85',
  boolean: '#d6e9ff',
  function: '#d6e9ff',
  className: '#d6e9ff',
  method: 'red',
}

var theme = {
  plain: {
    backgroundColor: '#1d262f',
    color: '#88b4e7',
  },
  styles: [
    {
      types: ['attr-name'],
      style: {
        color: colors.keyword,
      },
    },
    {
      types: ['attr-value'],
      style: {
        color: colors.string,
      },
    },
    {
      types: ['comment', 'block-comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: colors.comment,
      },
    },
    {
      types: [
        'property',
        'number',
        'function-name',
        'constant',
        'symbol',
        'deleted',
      ],
      style: {
        color: colors.primitive,
      },
    },
    {
      types: ['boolean'],
      style: {
        color: colors.boolean,
      },
    },
    {
      types: ['tag'],
      style: {
        color: colors.tag,
      },
    },
    {
      types: ['string'],
      style: {
        color: colors.string,
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: colors.punctuation,
      },
    },
    {
      types: ['selector', 'char', 'builtin', 'inserted'],
      style: {
        color: colors.char,
      },
    },
    {
      types: ['function'],
      style: {
        color: colors.function,
      },
    },
    {
      types: ['operator', 'entity', 'url', 'variable'],
      style: {
        color: colors.variable,
      },
    },
    {
      types: ['keyword'],
      style: {
        color: colors.keyword,
      },
    },
  ],
}

module.exports = theme
