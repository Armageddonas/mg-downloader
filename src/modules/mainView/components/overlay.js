import React, {Component} from 'react'

const injectStyle = (style) => {
    const styleElement = document.createElement('style');
    let styleSheet;

    document.head.appendChild(styleElement);

    styleSheet = styleElement.sheet;

    styleSheet.insertRule(style, styleSheet.cssRules.length);
};

// todo: Implement this the react way
export default class Overlay extends Component {
    constructor(props) {
        super(props);
        const keyframesStyle = `
             @keyframes slideUp {
                 0% {
                  opacity:100;
                 }
                 100% {
                   opacity:0;
                 }
             }
        `;
        injectStyle(keyframesStyle);
    }

    componentDidMount() {
        let anim = document.getElementById("overlay");
        anim.addEventListener("animationend", () => anim.setAttribute('style', 'display: none'), false);
    }

    render() {
        return <div id="overlay" style={styles.inner}/>
    }
}

let styles = {
    inner: {
        position: 'fixed',
        display: 'block',
        width: '100%',
        height: '100%',
        opacity: '0',
        top: '31px',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: '#2185D0',
        zIndex: '2',
        cursor: 'pointer',

        animation: 'slideUp 0.3s ease-out',
        animationFillMode: 'forwards'
    }
};