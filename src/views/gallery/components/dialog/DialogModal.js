import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export default class DialogModal extends React.Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            isVisible
        } = this.props;
        if (isVisible !== prevProps.isVisible) {
            if (isVisible) {
                $("body").css("overflow-y", "hidden");
            } else {
                $("body").css("overflow-y", "auto");
            }
        }
    }

    componentWillUnmount() {
        $("body").css("overflow-y", "auto");
    }

    render() {
        const {
            actionBar,
            header,
            children,
            isVisible,
            onClose
        } = this.props;
        return (
            <div className={"dialog-modal__background container-fluid " + (isVisible ? "" : "d-none")} >
                <div className={"row h-100"}>
                    <div className={"dialog-modal__container col-12 col-sm-9 col-md-7 col-lg-5 col-xl-4 mx-auto p-0 d-flex flex-column"}>
                        <div className={"dialog-modal__nav py-2 border-bottom"}>
                            <div className={"d-flex align-item-centers"}>
                                <span className={"btn-like text-secondary p-2 mr-4 ml-3"} onClick={() => onClose()}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                                <span className={"text-secondary flex-grow-1 d-flex align-items-center"}>
                                    <span>
                                        {header}
                                    </span>
                                </span>
                                <span className={""}>
                                    {actionBar}
                                </span>
                            </div>
                        </div>
                        <div className={"dialog-modal__content flex-grow-1"}>
                            { children }
                        </div>
                    </div>
                </div>


            </div>
        );
    }
};

DialogModal.propTypes = {
    actionBar: PropTypes.node,
    header: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};