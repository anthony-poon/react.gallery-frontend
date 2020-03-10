import React from 'react'
import loadingBar from "../images/loading_bar.svg";
import "intersection-observer";
import PropTypes from "prop-types";
export default class ThumbnailView extends React.Component{
    state = {
        isObserved: false,
        isLoaded: false
    };

    ref = React.createRef();

    componentDidMount() {
        let yOffset = this.ref.current.getBoundingClientRect().y;
        let windowYOffset = window.scrollY + window.innerHeight;
        if (windowYOffset > yOffset) {
            this.setState({
                isObserved: true
            })
        } else {
            let observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entries.isIntersecting === true || entry.intersectionRatio > 0) {
                        this.setState({
                            isObserved: true
                        });
                        observer.unobserve(entry.target);
                    }
                })
            });
            observer.observe(this.ref.current);
        }
    }

    render() {
        const {
            id,
            onClick,
            header,
            thumbnail,
            owner
        } = this.props;
        const {
            isLoaded,
            isObserved
        } = this.state;
        return (
            <div className={"gallery-item card mb-3"} ref={this.ref}>
                <div className={"gallery-item__img-container hoverable card-img-top"} onClick={() => {
                    onClick(id)
                }}>
                    <img className={isLoaded ? "gallery-item__img-loader invisible" : "gallery-item__img-loader visible"} src={loadingBar}/>
                    <img className={isLoaded ? "gallery-item__img visible" : "gallery-item__img invisible"} src={ isObserved ? thumbnail : null} onLoad={() => {
                        this.setState({
                            isLoaded: true
                        })
                    }}/>
                </div>
                <div className={"gallery-item__body card-body"}>
                    <div className={"gallery-item__header text-primary h6 text-monospace"}>
                        { header }
                    </div>
                    <div className={"gallery-item__content row"}>
                        <div className={"col text-secondary"}>
                            <small><i>Posted By: { owner }</i></small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ThumbnailView.defaultProps = {
    header: "Untitled",
    owner: "Anonymous"
};

ThumbnailView.propTypes = {
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    thumbnail: PropTypes.string.isRequired,
    header: PropTypes.string,
    owner: PropTypes.string
};