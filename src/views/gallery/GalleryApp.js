import React from "react"
import GalleryItem from "./components/GalleryItem";
import UploadButton from "./components/UploadButton";
import Modal from "./components/Modal";

export default class GalleryApp extends React.Component {
    state = {
        galleryItems: [],
        isModalVisible: false,
        modalContent: null
    };

    renderGalleryItems() {
        const {
            galleryItems
        } = this.state;
        return (
            galleryItems.map((item, index) => (
                <div className={"col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"} key={index}>
                    <GalleryItem
                        id={item.id}
                        header={item.header}
                        content={item.content}
                        thumbnail={item.thumbnail}
                        owner={item.owner}
                        onClick={() => {}}
                    />
                </div>
            ))
        )
    }

    triggerUpload(files) {
        if (files.length >= 0) {
            this.setState({
                isModalVisible: true
            })
        }
    }

    render() {
        const {
            isModalVisible
        } = this.state;
        return (
            <div className={"gallery-app"}>
                <div className={"py-5"}>
                    <div className="row">
                        { this.renderGalleryItems() }
                    </div>
                </div>
                <div className={"gallery-app__upload-button"}>
                    <UploadButton
                        onTrigger={this.triggerUpload.bind(this)}
                    />
                </div>
                {
                    isModalVisible && (
                        <Modal
                        >
                            <div>
                                test
                            </div>
                        </Modal>
                    )
                }
            </div>
        );
    }
}