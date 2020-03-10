import React from "react";
import loadingBar from "../images/loading_bar.svg";
import PropTypes from "prop-types";
const debounce = 700;

export default class AsyncTextButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    async handleClick() {
        const {
            onClick,
            isDisabled
        } = this.props;
        const {
            isLoading
        } = this.state;
        if (!isLoading && !isDisabled) {
            this.setState({
                isLoading: true
            }, async () => {
                await Promise.all([
                    new Promise((resolve) => {
                        setTimeout(resolve, debounce)
                    }),
                    onClick
                ]);
                this.setState({
                    isLoading: false
                })
            })
        }

    }

    render() {
        const {
            isDisabled,
            children
        } = this.props;
        const {
            isLoading
        } = this.state;
        return (
            <span className={isDisabled ? "disabled text-secondary" : "text-primary"} onClick={() => this.handleClick()}>
                <span className={isLoading ? "d-none" : "d-inline-block"}>
                    {children}
                </span>
                <img className={isLoading ? "d-inline-block visible" : "d-none invisible"} style={{height: "1.5rem"}} src={loadingBar} alt={"loading-bar"}/>
            </span>
        )
    }
}

AsyncTextButton.defaultProps = {
    isDisabled: false
};

AsyncTextButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
};