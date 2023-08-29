import axios from 'axios';
import * as fs from 'fs/promises';
import { HookRequest, ResponseObject } from "rests";
import API from "./api.js";

const TikAPI = (
    apiKey
): typeof API => {
    if (!apiKey) {
        throw new Error("The API Key is required.");
    }


    const on_success = function (res: ResponseObject, req: HookRequest) {

        /**
        * A convenient method to get the next batch of items, if the endpoint has iteration parameters (e.g cursor)
        */
        const nextItems = function () {
            if (!res?.json) {
                return null;
            }

            let nextCursorParams: {
                cursor?: string | number,
                offset?: string | number,
                nextCursor?: string,
                min_time?: string | number,
                max_time?: string | number
            } = {};

            if (res.json.hasMore || res.json.has_more) {
                nextCursorParams.cursor = res.json.cursor;
                nextCursorParams.offset = res.json.cursor;
            }

            if (res.json.notice_lists) {
                if (!Array.isArray(res.json.notice_lists) || !res.json.notice_lists.length) {
                    return null;
                }

                let notice_body = res.json.notice_lists[0];

                if (!notice_body.has_more) {
                    return null;
                }

                if (!notice_body.max_time || !notice_body.min_time) {
                    return null;
                }

                nextCursorParams.max_time = notice_body.max_time;
                nextCursorParams.min_time = notice_body.min_time;

            }

            if (res.json.nextCursor) {
                nextCursorParams.nextCursor = res.json.nextCursor;
            }

            if (!Object.keys(nextCursorParams).length) {
                return null;
            }

            return req.self({
                ...req.params,
                ...nextCursorParams
            });
        }

        /**
        * A method for downloading and saving videos.
        */
        const saveVideo = async function (link, path, fetchOptions = {}) {
            let headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
            };

            if (res.json?.$other?.videoLinkHeaders) {
                headers = {
                    ...headers,
                    ...res.json.$other.videoLinkHeaders
                };
            }

            try {
                const response = await axios.get(link, {
                    headers: headers,
                    ...fetchOptions,
                    responseType: 'arraybuffer'
                });
                await fs.writeFile(path, Buffer.from(response.data));
            } catch (error) {
                throw new Error("Failed downloading video: " + error.message);
            }
        }

        const streamVideo = async function (videoId) {
            // 1. Fetch the video info
            const videoInfo = await this.public.video({ id: videoId });

            if (!videoInfo.ok) {
                throw new Error("Failed to fetch video info.");
            }

            // 2. Extract the headers from the video info
            const videoHeaders = videoInfo.json.$other?.videoLinkHeaders;

            if (!videoHeaders) {
                throw new Error("Video headers not found in the video info response.");
            }

            // 3. Fetch the video stream using axios
            const videoUrl = videoInfo.json.itemInfo.itemStruct.video.downloadAddr;
            const response = await axios.get(videoUrl, {
                headers: videoHeaders,
                responseType: 'stream'
            });

            return response.data;
        }


        res['nextItems'] = nextItems;
        res['saveVideo'] = saveVideo;
        res['streamVideo'] = streamVideo;
    };


    return API['set']({
        apiKey: apiKey,
        $options: {
            on_success: on_success
        }
    });
}

TikAPI.default = TikAPI;

if (typeof module !== "undefined" && module.exports) {
    module.exports = TikAPI;
}

export default TikAPI;