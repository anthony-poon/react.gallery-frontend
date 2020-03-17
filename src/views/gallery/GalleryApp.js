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
        const focus = focusIndex !== null ? galleryItems[focusIndex] : null;
        return (
            <div className={"gallery-app"}>
                <div className={"gallery-app__header border-bottom py-3 bg-white"}>
                    <div className={"container"}>
                        <h3 className={"text-center text-monospace text-primary mb-0"}>
                            React Gallery
                        </h3>
                    </div>
                </div>
                <div className={"py-5 my-5"}>
                    <div className={"py-5 gallery-app__intro"}>
                        <p>
                            This is a gallery web application written in React. It is responsive and designed with mobile
                            experience in mind. The user can have app-like experience when accessing with mobile device without
                            the needs of installing anything.
                        </p>
                        <p>
                            Click on the photos to view more. Press the button on the bottom to upload photos.
                        </p>
                        <p className={"mt-5"}>
                            To view the source code, checkout my GitHub <a href={"https://github.com/anthony-poon/react.gallery-frontend"}>here</a>:
                        </p>
                    </div>
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
                <div className={"gallery-app__footer border-top py-2 bg-white"}>
                    <div className={"container text-center"}>
                        <UploadButton
                            onTrigger={this.triggerUpload.bind(this)}
                        />
                    </div>

                </div>
                <DialogModal
                    header={focus !== null ? focus.header : null}
                    isVisible={isModalVisible}
                    onClose={() => this.closeModal()}
                >
                    {
                        !!isModalVisible && focus !== null && (
                            <GalleryItemView
                                header={focus.header}
                                description={focus.content}
                                assets={focus.images}
                            />
                        )
                    }
                </DialogModal>
            </div>
        );
    }
}