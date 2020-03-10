import React from "react"
import ThumbnailView from "./components/ThumbnailView";
import UploadButton from "./components/UploadButton";
import DialogModal from "./components/dialog/DialogModal";
import GalleryItemView from "./components/gallery-item-view/GalleryItemView";
import API from "../../api";
import "./index.scss";

export default class GalleryApp extends React.Component {
    state = {
        galleryItems: [],
        focusIndex: null,
        isModalVisible: false,
    };

    componentDidMount() {
        (async () => {
            const items = await API.GalleryItem.getAll();
            console.log(items);
            this.setState({
                galleryItems: items
            });
        })();
    }

    openModal(index) {
        this.setState({
            focusIndex: index,
            isModalVisible: true
        })
    }

    closeModal() {
        this.setState({
            isModalVisible: false
        })
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
            isModalVisible,
            galleryItems,
            focusIndex
        } = this.state;
        return (
            <div className={"gallery-app"}>
                <div className={"py-5"}>
                    <div className="row">
                        {
                            galleryItems.map((item, index) => (
                                <div className={"col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"} key={index}>
                                    <ThumbnailView
                                        id={item.id}
                                        header={item.header}
                                        content={item.content}
                                        thumbnail={item.thumbnail}
                                        owner={item.owner}
                                        onClick={() => this.openModal(index)}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={"gallery-app__upload-button"}>
                    <UploadButton
                        onTrigger={this.triggerUpload.bind(this)}
                    />
                </div>
                <DialogModal
                    header={"Testing"}
                    isVisible={isModalVisible}
                    onClose={() => this.closeModal()}
                >
                    {
                        focusIndex !== null && (
                            <GalleryItemView
                                header={galleryItems[focusIndex].header}
                                description={galleryItems[focusIndex].content}
                                owner={null}
                                assets={galleryItems[focusIndex].images}
                            />
                        )
                    }

                </DialogModal>
            </div>
        );
    }
}