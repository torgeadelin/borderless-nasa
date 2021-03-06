import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import { css } from 'styled-components/native'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

//Shadows

const lightShadow = css`
  shadow-color: #000000;
  shadow-offset: {width: 0, height: 5};
  shadow-opacity: 0.05;
  shadow-radius: 20;
  elevation: 1;
`

const darkShadow = css`
  shadow-color: #000000;
  shadow-offset: {width: 0, height: 5};
  shadow-opacity: .3;
  shadow-radius: 20;
  elevation: 1;
`

const redShadow = css`
  position: relative;
  shadow-color: #D12757;
  shadow-offset: {width: 0, height: 5};
  shadow-opacity: .3;
  shadow-radius: 60;
  elevation: 1;
  z-index: 999;

`

const ApplicationStyles = {
    screen: {
        mainContainer: {
            flex: 1,
            position: 'relative',
            backgroundColor: Colors.transparent,
        },
        container: {
            flex: 1,
            position: 'relative',
            paddingHorizontal: 20,
            paddingTop: Metrics.doubleBaseMargin,
            paddingHorizontal: Metrics.doubleBaseMargin,
        },
        containerWithoutPadding: {
            flex: 1,
            position: 'relative',
        },
        absoluteFillObject: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        section: {
            margin: Metrics.section,
            padding: Metrics.baseMargin,
        },
    },
    shadows: {
        lightShadow: lightShadow,
        darkShadow: darkShadow,
        redShadow: redShadow,
    },
}

export default ApplicationStyles
