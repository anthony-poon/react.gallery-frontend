import React from "react"
import axios from "axios";
import AsyncTextButton from "../AsyncTextButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons"
import {faHeart as fasHeart, faShareAlt, faTrashAlt, faLayerGroup} from "@fortawesome/free-solid-svg-icons"
import loadingBar from "../../images/loading_bar.svg";
import PropTypes from "prop-types";
import "./main.scss";
export default class GalleryItemView extends React.Component{
    constructor(props) {
        super(props);
        // far is empty heard, fas is full
        this.state = {
            imageIndex: 0,
            isLoaded: false
        }
    }

    cycleImages() {
        const {
            assets
        } = this.props;
        if (assets.length > 1) {
            this.setState((prevState)=> {
                const imageIndex = prevState.imageIndex === (assets.length - 1) ? 0 : prevState.imageIndex + 1;
                return {
                    imageIndex,
                    isLoaded: false
                }
            });
        }
    }

    onLoadingBarLoaded() {
        setTimeout(() => {
            this.setState({
                imageIndex: 0
            });
        }, 700);
    }

    onImageLoad() {
        setTimeout(() => {
            this.setState({
                isLoaded: true,
            });
        }, 700)
    }

    render() {
        const {
            header,
            description,
            owner,
            assets
        } = this.props;
        const {
            isLoaded,
            imageIndex
        } = this.state;
        return (
            <div className={"gallery-item-view__body h-100"}>
                <div id={"js-image-container"} className={"gallery-item-view__image " + (assets.length > 1 ? "hoverable" : "") } onClick={() => this.cycleImages()}>
                    <div className={"gallery-item-view__page-index py-1 px-2 text-white"}>
                        <FontAwesomeIcon icon={faLayerGroup}/>
                        <small className={"ml-2"}>
                            {imageIndex + 1} of {assets.length}
                        </small>
                    </div>
                    <img className={ isLoaded ? "invisible loader" : "visible loader"} src={loadingBar} onLoad={() => this.onLoadingBarLoaded()} alt={"loading-bar"}/>
                    <img alt={"high-res-images"} className={ isLoaded  ? "visible gallery-item-view__high-res" : "invisible gallery-item-view__high-res"} src={assets[imageIndex]} onLoad={() => this.onImageLoad()}/>
                </div>
                <div className={"gallery-item-view__content px-3 py-3"}>
                    <div className={"row"}>
                        <div className={"col"}>
                            <h5 className="text-primary">
                                { header }
                            </h5>
                        </div>
                        <div className={"col-auto"}>
                            <div className={"gallery-item-view__btn_bar"} style={{
                                marginLeft: "-4px",
                                marginRight: "-4px"
                            }}>
                                <div className={"d-flex align-items-center"}>
                                    <AsyncTextButton
                                        onClick={() => {}}
                                    >
                                        <FontAwesomeIcon icon={farHeart}  fixedWidth={true}/>
                                    </AsyncTextButton>
                                    <AsyncTextButton
                                        onClick={() => {}}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} fixedWidth={true}/>
                                    </AsyncTextButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <p className={"col text-secondary"}>
                            {description}
                        </p>
                    </div>
                    <div className={"row"}>
                        <div className={"col text-secondary"}>
                            <small><i>Posted By: {owner}</i></small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

GalleryItemView.defaultProps = {
    header: "Untitled",
    description: "",
    owner: "Anonymous"
};

GalleryItemView.propTypes = {
    header: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    assets: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};