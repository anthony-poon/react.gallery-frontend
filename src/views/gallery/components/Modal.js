import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";
export default class Modal extends React.Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isVisible !== prevProps.isVisible) {
            if (this.props.isVisible) {
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
            children
        } = this.props;
        return (
            <div className={"gallery-modal"}>
                { children }
            </div>
        );
    }
};

Modal.propTypes = {
    children: PropTypes.node.isRequired
};