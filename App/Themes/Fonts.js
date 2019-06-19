const type = {
  base: 'Helvetica Neue',
  bold: 'HelveticaNeue-Bold',
  emphasis: 'HelveticaNeue-Italic'
}

const size = {
  title: 45,
  subtitle: 20,
  text: 16,
  small: 14,
}

const style = {
  title: {
    fontFamily: type.bold,
    fontSize: size.title
  },
  subtitle: {
    fontFamily: type.base,
    fontSize: size.subtitle
  },
  text: {
    fontFamily: type.base,
    fontSize: size.text
  },
  small: {
    fontFamily: type.base,
    fontSize: size.small
  }
}

export default {
  type,
  size,
  style
}
