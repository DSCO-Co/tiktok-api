/*!
 * Made with Rests
 * github.com/el1s7/rests
 */

type json =
	| string
	| number
	| boolean
	| null
	| json[]
	| { [key: string]: json };

interface FormData {
	[Symbol.iterator](): IterableIterator<[string, File | string]>;
	/** Returns an array of key, value pairs for every entry in the list. */
	entries(): IterableIterator<[string, File | string]>;
	/** Returns a list of keys in the list. */
	keys(): IterableIterator<string>;
	/** Returns a list of values in the list. */
	values(): IterableIterator<File | string>;
}

interface ResponseObject {
	statusCode: number,
	statusText: string,
	headers: Headers,
	type: "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect",
	ok: boolean,
	json?: any,
	text?: string,
	formData?: FormData,
	blob?: Blob,
	message?: string

	/**
	 * A convenient method to get the next batch of items, if the endpoint has iteration parameters (e.g cursor)
	 */
	nextItems?: () => Promise<any> | null,

	/**
	 * A method for downloading and saving videos.
	 */
	saveVideo?: (
		/**
		 * The TikTok video link.
		 * 
		 * @example
		 * `https://v19-webapp-prime.tiktok.com/video/tos/useast2a/tos-useast2a-ve-0068c001/oAbHZqfpLAdbgjckgQ8eGvSnib8VqfbDCICkZo...`
		 */
		link: string,

		/**
		 * The absolute local file save path.
		 */

		path: string,

		/**
		 * Optional Fetch options to configure the request (e.g. you can use this to set proxies by specifing the HTTP agent option)
		 */

		fetchOptions?: any
	) => Promise<any>

	/**
	* A method for streaming the video buffer.
	*/
	streamVideo?: (videoId: string) => Promise<any>;
}

type HookRequest = {
	/**
	 * Fetch URL
	 */
	url: string,

	/**
	 * Fetch Options
	 */
	options: any,

	/**
	 * The parameters supplied for this request
	 */
	params: any

	/**
	 * Rests instance
	 */
	instance: any

	/**
	 * Endpoint Key, e.g "user.login"
	 */
	key: string
};

interface Hooks {
	/**
	 * A global hook function that is called on request.
	 * 
	 */
	on_request?: (request: HookRequest) => any,

	/**
	 * A hook function that is called on successful response, you can also modify and return a different response.
	 */
	on_success?: (response: ResponseObject, request?: HookRequest) => any,

	/**
	 * A hook function that is called on errors.
	 * 
	 * 
	 * To return a different error:
	 */

	on_error?: (error: ResponseObject | unknown, request?: HookRequest) => any,
}

interface Params {
	[name: string]: {
		/** The parameter HTTP name */
		name?: string,

		/** Required or not */
		required?: boolean,

		/** A help message to throw in case of errors */
		help?: string,

		/** Param type (default: any)*/
		type?: "string" | "number" | "array" | "object" | "boolean" | "any",

		/** Example value */
		example?: any,

		/** Format functions that accepts supplied value and returns formatted value. */
		format?: (value: any) => any,

		/** Regex validation */
		validate?: RegExp | string,

		/** Array validation */
		in?: any[],

		max?: number,

		min?: number,

		/** Default value */
		default?: any,

		/** HTTP Location */
		location?: "body" | "headers" | "query" | "path",

	}
}

interface Options extends Hooks {
	base?: string,

	sandboxBase?: string,

	headers?: any,

	params?: Params,

	/**
	 * Set default values for parameters
	 */
	values?: {
		[param_name: string]: any
	}

	/**
	 * Node-Fetch option for adding a proxy
	 */
	fetch_agent?: any,
}

interface newCategoryOptions {
	/**
	 * Override global options for this category
	 */
	$options: Options;
}

interface newCategoryWithOptions extends newCategoryOptions {
	[param: string]: any | Options;
}

type newCategoryValues = {
	[param: string]: any
} | newCategoryWithOptions;



declare class HideFuncProps<T>{
	private name;
	private apply;
	private bind;
	private arguments;
	private call;
	private caller;
	private length;
	private prototype;
	private toString;
	//public set: (values: newCategoryValues) => T;
}


interface updateOptions<X> extends HideFuncProps<X> {
	set: (values: newCategoryValues) => X
}

interface newCategory<T> extends HideFuncProps<T> {
	new(values: newCategoryValues): T & updateOptions<T>;
}
export interface APIPublic extends newCategory<APIPublic> {

	/**
	 * Get a user's profile information 
	 */
	check: (params?: {
	/**
	 * The TikTok user username	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	username?: string
	

	/**
	 * Optionally you can get the profile information using the user_id parameter. 
	 */
	user_id?: string
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get a user's feed posts 
	 */
	posts: (params?: {
	/**
	 * The TikTok user secUid. You can get this from the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint using the username.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: string
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get a user's liked posts 
	 */
	likes: (params?: {
	/**
	 * The TikTok user secUid. You can get this from the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint using the username.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: string
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get a user's followers list 
	 */
	followersList: (params?: {
	/**
	 * The TikTok user secUid. You can get this from the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint using the username.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * A iteration parameter returned in each response, should be included in the next requests to get the next items. 
	 */
	nextCursor?: string
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get a user's following list 
	 */
	followingList: (params?: {
	/**
	 * The TikTok user secUid. You can get this from the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint using the username.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * A iteration parameter returned in each response, should be included in the next requests to get the next items. 
	 */
	nextCursor?: string
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get trending posts 
	 */
	explore: (params?: {
	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get video information 
	 */
	video: (params?: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)	
	 * 
	 * @example
	 * 
	 * `"7109178205151464746"`
	 * 						 
	 */
	id?: string
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get related posts 
	 */
	relatedPosts: (params?: {
	/**
	 * The video ID from which to get related posts. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)	
	 * 
	 * @example
	 * 
	 * `"7109178205151464746"`
	 * 						 
	 */
	video_id?: string
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get a user's playlists 
	 */
	playlists: (params?: {
	/**
	 * The TikTok user secUid. You can get this from the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint using the username.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: string
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get a playlist items 
	 */
	playlistItems: (params?: {
	/**
	 * The playlist ID.	
	 * 
	 * @example
	 * 
	 * `"6948562344666532614"`
	 * 						 
	 */
	playlist_id?: any
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: string
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get explore posts by category 
	 */
	exploreCategory: (params?: {
	/**
	 * The category ID.	
	 * 
	 * @example
	 * 
	 * `"1"`
	 * 						 
	 */
	category_id?: any
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get hashtag posts 
	 */
	hashtag: (params?: {
	/**
	 * The hashtag ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)	
	 * 
	 * @example
	 * 
	 * `"4655293"`
	 * 						 
	 */
	id?: string
	

	/**
	 * The hashtag name 
	 */
	name?: string
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: string
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get music posts 
	 */
	music: (params?: {
	/**
	 * The music ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)	
	 * 
	 * @example
	 * 
	 * `"28459463"`
	 * 						 
	 */
	id?: string
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: string
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get music information 
	 */
	musicInfo: (params?: {
	/**
	 * The music ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)	
	 * 
	 * @example
	 * 
	 * `"28459463"`
	 * 						 
	 */
	id?: string
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Discover users, music, hashtags 
	 */
	discover: (params?: {
	/**
	 * The discover category	
	 * 
	 * @example
	 * 
	 * `"users"`
	 * 						 
	 */
	category?: string
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting offset of items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	offset?: number
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Discover by keyword 
	 */
	discoverKeyword: (params?: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	keyword?: string
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * (Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request. 
	 */
	session_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Search 
	 */
	search: (params?: {
	/**
	 * The search category	
	 * 
	 * @example
	 * 
	 * `"general"`
	 * 						 
	 */
	category?: string
	

	/**
	 * The search keyword	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	query?: string
	

	/**
	 * The cookies and IP are preserved through different requests for a longer amount of time. You should use this if you want to keep the search suggestions the same. 
	 */
	session_id?: number
	

	/**
	 * The starting offset of items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: number
	

	/**
	 * You can optionally choose the proxy country from where the request
	 * 					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;

}

export interface APIUserPostsComments extends newCategory<APIUserPostsComments> {

	/**
	 * Get a video comments list 
	 */
	list: (params?: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)	
	 * 
	 * @example
	 * 
	 * `"7109178205151464746"`
	 * 						 
	 */
	media_id?: string
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get a comment reply list 
	 */
	replies: (params?: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)	
	 * 
	 * @example
	 * 
	 * `"7109178205151464746"`
	 * 						 
	 */
	media_id?: string
	

	/**
	 * The comment ID	
	 * 
	 * @example
	 * 
	 * `"7109185042560680750"`
	 * 						 
	 */
	comment_id?: string
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Post a new comment 
	 */
	post: (params?: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)	
	 * 
	 * @example
	 * 
	 * `"7109178205151464746"`
	 * 						 
	 */
	media_id?: string
	

	/**
	 * The comment text	
	 * 
	 * @example
	 * 
	 * `"Italian food is the best"`
	 * 						 
	 */
	text?: string
	

	/**
	 * You can reply to a comment by including a comment ID 
	 */
	reply_comment_id?: string
	

	/**
	 * You should set this to true if you are mentioning someone. 
	 */
	has_tags?: boolean
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Like a comment 
	 */
	like: (params?: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)	
	 * 
	 * @example
	 * 
	 * `"7109178205151464746"`
	 * 						 
	 */
	media_id?: string
	

	/**
	 * The comment ID	
	 * 
	 * @example
	 * 
	 * `"7109185042560680750"`
	 * 						 
	 */
	comment_id?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Unlike a comment 
	 */
	unlike: (params?: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)	
	 * 
	 * @example
	 * 
	 * `"7109178205151464746"`
	 * 						 
	 */
	media_id?: string
	

	/**
	 * The comment ID	
	 * 
	 * @example
	 * 
	 * `"7109185042560680750"`
	 * 						 
	 */
	comment_id?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Delete a comment 
	 */
	delete: (params?: {
	/**
	 * The comment ID	
	 * 
	 * @example
	 * 
	 * `"7109185042560680750"`
	 * 						 
	 */
	comment_id?: string
	
} | FormData) => Promise<ResponseObject>;

}

export interface APIUserPosts extends newCategory<APIUserPosts> {

	/**
	 * Get feed posts 
	 */
	feed: (params?: {
	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: string
	

	/**
	 * The TikTok user secUid. You can get this from the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint using the username.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get liked posts 
	 */
	likes: (params?: {
	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The TikTok user secUid. You can get this from the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint using the username.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get following posts 
	 */
	followingPosts: (params?: {
	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get related posts 
	 */
	relatedPosts: (params?: {
	/**
	 * The video ID from which to get related posts. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)	
	 * 
	 * @example
	 * 
	 * `"7109178205151464746"`
	 * 						 
	 */
	video_id?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get saved posts 
	 */
	savedPosts: (params?: {
	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get user playlists 
	 */
	playlists: (params?: {
	/**
	 * The TikTok user secUid. You can get this from the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint using the username.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get a playlist items 
	 */
	playlistItems: (params?: {
	/**
	 * The playlist ID.	
	 * 
	 * @example
	 * 
	 * `"6948562344666532614"`
	 * 						 
	 */
	playlist_id?: any
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get trending posts 
	 */
	explore: (params?: {
	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get video information 
	 */
	video: (params?: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)	
	 * 
	 * @example
	 * 
	 * `"7109178205151464746"`
	 * 						 
	 */
	id?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Like a video 
	 */
	like: (params?: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)	
	 * 
	 * @example
	 * 
	 * `"7109178205151464746"`
	 * 						 
	 */
	media_id?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Unlike a video 
	 */
	unlike: (params?: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)	
	 * 
	 * @example
	 * 
	 * `"7109178205151464746"`
	 * 						 
	 */
	media_id?: string
	
} | FormData) => Promise<ResponseObject>;

	/**
	 * Comments Endpoints Category 
	 */
	comments: APIUserPostsComments

}

export interface APIUserConversationRequests extends newCategory<APIUserConversationRequests> {

	/**
	 * Get user conversation requests 
	 */
	conversations: (params?: {
	/**
	 * The starting offset of items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	nextCursor?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get a conversation request messages 
	 */
	messages: (params?: {
	/**
	 * The conversation ID	
	 * 
	 * @example
	 * 
	 * `"0:1:684574219823284956:69402435203845897564"`
	 * 						 
	 */
	conversation_id?: any
	

	/**
	 * The additional conversation short ID	
	 * 
	 * @example
	 * 
	 * `"6940245147502654884"`
	 * 						 
	 */
	conversation_short_id?: any
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Mark a requests conversation as read 
	 */
	markRead: (params?: {
	/**
	 * The conversation ID	
	 * 
	 * @example
	 * 
	 * `"0:1:684574219823284956:69402435203845897564"`
	 * 						 
	 */
	conversation_id?: any
	

	/**
	 * The additional conversation short ID	
	 * 
	 * @example
	 * 
	 * `"6940245147502654884"`
	 * 						 
	 */
	conversation_short_id?: any
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Delete a conversation request 
	 */
	delete: (params?: {
	/**
	 * The conversation ID	
	 * 
	 * @example
	 * 
	 * `"0:1:684574219823284956:69402435203845897564"`
	 * 						 
	 */
	conversation_id?: any
	

	/**
	 * The additional conversation short ID	
	 * 
	 * @example
	 * 
	 * `"6940245147502654884"`
	 * 						 
	 */
	conversation_short_id?: any
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Accept a conversation request 
	 */
	accept: (params?: {
	/**
	 * The conversation ID	
	 * 
	 * @example
	 * 
	 * `"0:1:684574219823284956:69402435203845897564"`
	 * 						 
	 */
	conversation_id?: any
	

	/**
	 * The additional conversation short ID	
	 * 
	 * @example
	 * 
	 * `"6940245147502654884"`
	 * 						 
	 */
	conversation_short_id?: any
	

	/**
	 * The sender ID.	
	 * 
	 * @example
	 * 
	 * `"6569595380449902597"`
	 * 						 
	 */
	user_id?: string
	
} | FormData) => Promise<ResponseObject>;

}

export interface APIUserLive extends newCategory<APIUserLive> {

	/**
	 * Check live permissions 
	 */
	permissions: () => Promise<ResponseObject>;


	/**
	 * Start live video 
	 */
	start: (params?: {
	/**
	 * The live room header title	
	 * 
	 * @example
	 * 
	 * `"Check out my live!"`
	 * 						 
	 */
	title?: any
	

	/**
	 * TikTok has a special gateway for invite only users. Only if this is enabled you can do third party streaming.	
	 * 
	 * @example
	 * 
	 * `true`
	 * 						 
	 */
	third_party?: any
	

	/**
	 * (Optional) The topic ID. You can find this by using the <a href='#tag/Live/operation/user.live.topics'>Get topics list</a> endpoint. 
	 */
	hashtag_id?: number
	

	/**
	 * (Optional) The sub-topic ID for gaming topics. 
	 */
	game_tag_id?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Stop live video 
	 */
	stop: () => Promise<ResponseObject>;


	/**
	 * Get live information 
	 */
	info: (params?: {
	/**
	 * The Live room ID. You can find this using the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint.	
	 * 
	 * @example
	 * 
	 * `"7112492061034646278"`
	 * 						 
	 */
	room_id?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get recommended live videos 
	 */
	recommend: (params?: {
	/**
	 * The Live room ID. You can find this using the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint.	
	 * 
	 * @example
	 * 
	 * `"7112492061034646278"`
	 * 						 
	 */
	room_id?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get live statistics 
	 */
	stats: (params?: {
	/**
	 * The Live room ID. You can find this using the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint.	
	 * 
	 * @example
	 * 
	 * `"7112492061034646278"`
	 * 						 
	 */
	room_id?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get live chat and gifts 
	 */
	chat: (params?: {
	/**
	 * The Live room ID. You can find this using the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint.	
	 * 
	 * @example
	 * 
	 * `"7112492061034646278"`
	 * 						 
	 */
	room_id?: string
	

	/**
	 * Returned in each response, should be included in the next requests to get the next chat events. 
	 */
	nextCursor?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Send a message to a live chat 
	 */
	sendChat: (params?: {
	/**
	 * The Live room ID. You can find this using the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint.	
	 * 
	 * @example
	 * 
	 * `"7112492061034646278"`
	 * 						 
	 */
	room_id?: string
	

	/**
	 * The chat text message	
	 * 
	 * @example
	 * 
	 * `"A mí me gusta"`
	 * 						 
	 */
	text?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get live topics list 
	 */
	topics: () => Promise<ResponseObject>;


	/**
	 * Get coin transactions history 
	 */
	transactionHistory: (params?: {
	/**
	 * The list page number	
	 * 
	 * @example
	 * 
	 * `1`
	 * 						 
	 */
	page?: any
	

	/**
	 * The items limit per page	
	 * 
	 * @example
	 * 
	 * `12`
	 * 						 
	 */
	count?: any
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Search live videos 
	 */
	search: (params?: {
	/**
	 * The search keyword	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	query?: string
	

	/**
	 * The starting offset of items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get live analytics 
	 */
	analytics: (params?: {
	/**
	 * The days time frame for the analytics data	
	 * 
	 * @example
	 * 
	 * `7`
	 * 						 
	 */
	days?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get live videos list 
	 */
	list: (params?: {
	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting offset of items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	offset?: number
	

	/**
	 * Sort results by ascending (1) or descending (0). Default is descending (0).	
	 * 
	 * @example
	 * 
	 * `1`
	 * 						 
	 */
	sort?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get a live video details 
	 */
	details: (params?: {
	/**
	 * The Live room ID.	
	 * 
	 * @example
	 * 
	 * `"7112492061034646278"`
	 * 						 
	 */
	room_id?: string
	
} | FormData) => Promise<ResponseObject>;

}

export interface APIUser extends newCategory<APIUser> {

	/**
	 * Get profile information 
	 */
	info: (params?: {
	/**
	 * The TikTok user username 
	 */
	username?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Edit profile 
	 */
	edit: (params?: {
	/**
	 * The profile field.	
	 * 
	 * @example
	 * 
	 * `"bio"`
	 * 						 
	 */
	field?: string
	

	/**
	 * The new field value	
	 * 
	 * @example
	 * 
	 * `"My new bio"`
	 * 						 
	 */
	value?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get notifications 
	 */
	notifications: (params?: {
	/**
	 * Filter notifications by type	
	 * 
	 * @example
	 * 
	 * `"all"`
	 * 						 
	 */
	filter?: string
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * Returned in every response, should be included in the next request for iteration. 
	 */
	max_time?: any
	

	/**
	 * Returned in every response, should be included in the next request for iteration. 
	 */
	min_time?: any
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get analytics 
	 */
	analytics: (params?: {
	/**
	 * The analytics type	
	 * 
	 * @example
	 * 
	 * `"overview"`
	 * 						 
	 */
	type?: string
	

	/**
	 * The days time frame for the analytics data	
	 * 
	 * @example
	 * 
	 * `7`
	 * 						 
	 */
	days?: number
	

	/**
	 * Required only for **video** type analytics, otherwise don't include. 
	 */
	media_id?: any
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Check session 
	 */
	verify: () => Promise<ResponseObject>;


	/**
	 * Get following list 
	 */
	followingV1: (params?: {
	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	cursor?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get following list 
	 */
	following: (params?: {
	/**
	 * The TikTok user secUid. You can get this from the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint using the username.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * A iteration parameter returned in each response, should be included in the next requests to get the next items. 
	 */
	nextCursor?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get followers list 
	 */
	followers: (params?: {
	/**
	 * The TikTok user secUid. You can get this from the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint using the username.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * Maximum amount of items for one request	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * A iteration parameter returned in each response, should be included in the next requests to get the next items. 
	 */
	nextCursor?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Follow a user 
	 */
	follow: (params?: {
	/**
	 * The TikTok user username	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	username?: string
	

	/**
	 * The TikTok user secUid. You can get this from the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint using the username.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * The TikTok user ID	
	 * 
	 * @example
	 * 
	 * `"6569595380449902597"`
	 * 						 
	 */
	user_id?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Unfollow a user 
	 */
	unfollow: (params?: {
	/**
	 * The TikTok user username	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	username?: string
	

	/**
	 * The TikTok user secUid. You can get this from the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint using the username.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * The TikTok user ID	
	 * 
	 * @example
	 * 
	 * `"6569595380449902597"`
	 * 						 
	 */
	user_id?: string
	
} | FormData) => Promise<ResponseObject>;

	/**
	 * The user endpoints require an `accountKey` 
	 */
	posts: APIUserPosts


	/**
	 * Get user conversations 
	 */
	conversations: (params?: {
	/**
	 * The starting offset of items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	nextCursor?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get user messages 
	 */
	messages: (params?: {
	/**
	 * The conversation ID	
	 * 
	 * @example
	 * 
	 * `"0:1:684574219823284956:69402435203845897564"`
	 * 						 
	 */
	conversation_id?: any
	

	/**
	 * The additional conversation short ID (TikTok uses two different ID's for some reason)	
	 * 
	 * @example
	 * 
	 * `"6940245147502654884"`
	 * 						 
	 */
	conversation_short_id?: any
	

	/**
	 * The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)* 
	 */
	nextCursor?: string
	

	/**
	 *  
	 */
	limit?: any
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Send a message 
	 */
	sendMessage: (params?: {
	/**
	 * The message text	
	 * 
	 * @example
	 * 
	 * `"Hey! How you doing?"`
	 * 						 
	 */
	text?: string
	

	/**
	 * The conversation ID	
	 * 
	 * @example
	 * 
	 * `"0:1:684574219823284956:69402435203845897564"`
	 * 						 
	 */
	conversation_id?: string
	

	/**
	 * The additional conversation short ID (TikTok uses two different ID's for some reason)	
	 * 
	 * @example
	 * 
	 * `"6940245147502654884"`
	 * 						 
	 */
	conversation_short_id?: string
	

	/**
	 * The conversation ticket	
	 * 
	 * @example
	 * 
	 * `"3M8IlBpABq00h2aNB1B5JJ2ne0DTnGLLAFjGQQGMf4BKWJxEYxf7RAE0KaD2EjkQkWiJalT4xj36JGWa1ZmQg7SgQfHLoXffNFYLkIJhe1HVyiPXitoxWFyuzlX1xvBCYhZxkQALHE4gx9AaXBPEZjks7jC"`
	 * 						 
	 */
	ticket?: string
	
} | FormData) => Promise<ResponseObject>;

	/**
	 * The user endpoints require an `accountKey` 
	 */
	conversationRequests: APIUserConversationRequests

	/**
	 * The user endpoints require an `accountKey` 
	 */
	live: APIUserLive

}

export interface API extends updateOptions<API> {
	/**
	 * Public Endpoints Category 
	 */
	public: APIPublic

	/**
	 * User Endpoints Category 
	 */
	user: APIUser


	/**
	 * Get information about your API Key 
	 */
	key: () => Promise<ResponseObject>;

}

declare const API: API;

export default API;
	