import * as screenshotone from "screenshotone-api-sdk";
import { saveWebpageThumbnail } from "@/lib/webpageThumbnailStorage";

export const generateWebpageThumbnail = async (urlToGenerate) => {
    const client = new screenshotone.Client(
        `${process.env.SCREENSHOTONE_ACCESS_KEY}`,
        `${process.env.SCREENSHOTONE_SECRET_KEY}`
    );

    const options = screenshotone.TakeOptions.url(urlToGenerate).delay(3).blockAds(true);

    const imageBlob = await client.take(options);
    const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());

    if (!imageBuffer || imageBuffer.byteLength === 0) {
        throw new Error("Received empty image buffer from ScreenshotOne");
    }

    const blob = new Blob([imageBuffer], { type: "image/*" });

    return blob;
};
