var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import * as fs from 'fs/promises';
import API from "./api.js";
const TikAPI = (apiKey) => {
    if (!apiKey) {
        throw new Error("The API Key is required.");
    }
    const on_success = function (res, req) {
        /**
        * A convenient method to get the next batch of items, if the endpoint has iteration parameters (e.g cursor)
        */
        const nextItems = function () {
            if (!(res === null || res === void 0 ? void 0 : res.json)) {
                return null;
            }
            let nextCursorParams = {};
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
            return req.self(Object.assign(Object.assign({}, req.params), nextCursorParams));
        };
        /**
        * A method for downloading and saving videos.
        */
        const saveVideo = function (link, path, fetchOptions = {}) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                let headers = {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
                };
                if ((_b = (_a = res.json) === null || _a === void 0 ? void 0 : _a.$other) === null || _b === void 0 ? void 0 : _b.videoLinkHeaders) {
                    headers = Object.assign(Object.assign({}, headers), res.json.$other.videoLinkHeaders);
                }
                try {
                    const response = yield axios.get(link, Object.assign(Object.assign({ headers: headers }, fetchOptions), { responseType: 'arraybuffer' }));
                    yield fs.writeFile(path, Buffer.from(response.data));
                }
                catch (error) {
                    throw new Error("Failed downloading video: " + error.message);
                }
            });
        };
        const streamVideo = function (videoId) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                // 1. Fetch the video info
                const videoInfo = yield this.public.video({ id: videoId });
                if (!videoInfo.ok) {
                    throw new Error("Failed to fetch video info.");
                }
                // 2. Extract the headers from the video info
                const videoHeaders = (_a = videoInfo.json.$other) === null || _a === void 0 ? void 0 : _a.videoLinkHeaders;
                if (!videoHeaders) {
                    throw new Error("Video headers not found in the video info response.");
                }
                // 3. Fetch the video stream using axios
                const videoUrl = videoInfo.json.itemInfo.itemStruct.video.downloadAddr;
                const response = yield axios.get(videoUrl, {
                    headers: videoHeaders,
                    responseType: 'stream'
                });
                return response.data;
            });
        };
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
};
TikAPI.default = TikAPI;
if (typeof module !== "undefined" && module.exports) {
    module.exports = TikAPI;
}
export default TikAPI;
