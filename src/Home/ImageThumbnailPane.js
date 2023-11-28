import {Link} from "react-router-dom";
import "./styles.css";

function ImageThumbnailPane({ img_title_id, pane_title }) {
    console.log("Img title id " + JSON.stringify(img_title_id));
    return (
        <div className={"d-flex flex-column pt-5"}>
            <h3>{pane_title}</h3>
            <div className={"d-flex flex-row overflow-auto"}>
                {img_title_id.map((image, index) => (
                    <Link
                        key={index}
                        to={`/details/${image._id}`}>
                        {console.log("Image " + JSON.stringify(image))}
                        <img className={"wd-thumbnail-pane-image p-1"} src={image.img} alt={image.title}/>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ImageThumbnailPane;