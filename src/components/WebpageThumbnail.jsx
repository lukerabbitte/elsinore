import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const WebpageThumbnail = ({ fullTextURL, webpageThumbnailURLSrc, webpageThumbnailAltText }) => {
    const [hoveringOnLink, setHoveringOnLink] = useState(false);

    return (
        <a
            className="relative h-fit w-20 rounded-b-md shadow-xl"
            href={fullTextURL}
            target="_blank"
            onMouseEnter={() => setHoveringOnLink(true)}
            onMouseLeave={() => setHoveringOnLink(false)}
        >
            {webpageThumbnailURLSrc && (
                <div className="overflow-hidden h-12 w-20">
                    <Image
                        src={webpageThumbnailURLSrc}
                        alt={webpageThumbnailAltText}
                        width={80}
                        height={60}
                        className="rounded-t-md"
                    />
                </div>
            )}

            <Badge
                variant={`${webpageThumbnailURLSrc ? "noRounding" : "default"}`}
                className={`text-xs w-full flex flex-row items-center justify-center ${webpageThumbnailURLSrc ? "rounded-b-md" : ""} transition-all duration-300 ${
                    hoveringOnLink ? "opacity-80" : ""
                }`}
            >
                <p className={`transition-all duration-300 ${hoveringOnLink ? "scale-90" : ""}`}>
                    Source
                    <span className="ml-1">
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </span>
                </p>
            </Badge>
        </a>
    );
};

export default WebpageThumbnail;
