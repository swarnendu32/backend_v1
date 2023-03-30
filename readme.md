###### URL

/feed/discover/foryou

###### PARAMS

none

###### BODY

PageRequestBodyParams

###### RESPONSE

AccountPageResponseBodyParams

###### description

account suggestion based on previous interactions like post interactions(suggests the author of those posts), following other accounts(suggests account that is followed by these account)

---

###### URL

/feed/discover/popular

###### PARAMS

none

###### BODY

PageRequestBodyParams

###### RESPONSE

AccountPageResponseBodyParams

###### description

suggests popular accounts based on number of followers(upper and lower bounds may change with time)

---

###### URL

/feed/discover/new

###### PARAMS

none

###### BODY

PageRequestBodyParams

###### RESPONSE

AccountPageResponseBodyParams

###### description

suggests new accounts created in the app(lower bound of date created may change with time)

---

###### URL

/feed/discover/nearby

###### PARAMS

none

###### BODY

PageRequestBodyParams

###### RESPONSE

AccountPageResponseBodyParams

###### description

suggests account that are nearby to the target device(radius of search may change with time)

---

###### URL

/feed/foryou/photos

###### PARAMS

none

###### BODY

PageRequestBodyParams

###### RESPONSE

PostPageResponseBodyParams

###### description

suggests photos based on the users choice

---

###### URL

/feed/foryou/videos

###### PARAMS

none

###### BODY

PageRequestBodyParams

###### RESPONSE

PostPageResponseBodyParams

###### description

suggests videos based on the users choice

---

###### URL

/feed/foryou/moments

###### PARAMS

none

###### REQUEST BODY

PageRequestBodyParams

###### RESPONSE BODY

PostPageResponseBodyParams

###### description

suggests moments based on the users choice

---

###### URL

/feed/search

###### PARAMS

none

###### BODY

SearchRequestBodyParams

###### RESPONSE

SearchResponseBodyParams

###### description

returns a quick search results of popular search phases and entities(account, hashtag, location, audio)

###### URL

/feed/search/entites/posts

###### PARAMS

none

###### BODY

PageSearchRequestBodyParams

###### RESPONSE

PostSearchResponseBodyParams

###### description

returns post search results based on search phase(searchable parameters are caption and location)

###### URL

/feed/search/accounts

###### PARAMS

none

###### BODY

SearchRequestBodyParams

###### RESPONSE

AccountListSearchResponseBodyParams

###### description

returns account search results

---

###### URL

/feed/search/audio

###### PARAMS

none

###### BODY

SearchRequestBodyParams

###### RESPONSE

AudioListSearchResponseBodyParams

###### description

returns audio search results

---

###### URL

/feed/search/hashtag

###### PARAMS

none

###### BODY

SearchRequestBodyParams

###### RESPONSE

SearchResponseBodyParamsHashTagAndLocationListSearchResponseBodyParams

###### description

returns hashtag search results

---

###### URL

/feed/search/locations

###### PARAMS

none

###### BODY

SearchRequestBodyParams

###### RESPONSE

HashTagAndLocationListSearchResponseBodyParams

###### description

returns location search results

###### URL

/feed/explore

###### PARAMS

none

###### BODY

PartialPageRequestBodyParams

###### RESPONSE

PostPageResponseBodyParams

###### description

returns popular posts based on users choice

---

###### URL

/explore/{post-id}

###### PARAMS

PostQueryParams

###### BODY

PartialPageRequestBodyParams

###### RESPONSE

PostPageResponseBodyParams

###### description

returns popular photos based on a target post

---

###### URL

/feed/home

###### PARAMS

none

###### BODY

none

###### RESPONSE

HomeRouteResponseBodyParams

###### description

returns home route details

---

###### URL

/feed/home/followingposts

###### PARAMS

none

###### BODY

PartialPageRequestBodyParams

###### RESPONSE

PostPageResponseBodyParams

###### description

returns posts from following accounts

---

###### URL

/feed/home/followingmemories

###### PARAMS

none

###### BODY

PartialPageRequestBodyParams

###### RESPONSE

AccountPageResponseBodyParams

###### description

returns memory informations of following accounts

---

###### URL

/feed/home/suggestedmemories

###### PARAMS

none

###### BODY

PartialPageRequestBodyParams

###### RESPONSE

AccountPageResponseBodyParams

###### description

returns memory informations of suggested accounts

###### URL

/entites/posts/{post-id}/delete

###### METHOD

DELETE

###### PARAMS

PostRequestQueryParams

###### BODY

none

###### RESPONSE

ResponseBodyParams<never, PostRequestQueryParams>

###### description

delete the mentioned post

---

###### URL

/entites/posts/{post-id}/report

###### METHOD

PUT

###### PARAMS

PostRequestQueryParams

###### BODY

ReportRequestBodyParams

###### RESPONSE

ResponseBodyParams<never, PostRequestQueryParams, ReportRequestBodyParams>

###### description

report the mentioned post

---

###### URL

/entites/posts/{post-id}/likes

###### METHOD

PUT

###### PARAMS

PostRequestQueryParams

###### BODY

none

###### RESPONSE

ResponseBodyParams<never, PostRequestQueryParams>

###### description

likes the mentioned post

---

###### URL

/entites/posts/{post-id}/likes

###### METHOD

GET

###### PARAMS

PostRequestQueryParams

###### BODY

PartialSearchRequestBodyParams

###### RESPONSE

AccountListPartialSearchResponseBodyParams<PostRequestQueryParams>

###### description

get likes list of the mentioned post with an optional search query string as filter

---

###### URL

/entites/posts/{post-id}/likes/followings

###### METHOD

GET

###### PARAMS

PostRequestQueryParams

###### BODY

PageRequestBodyParams

###### RESPONSE

AccountPageResponseBodyParams<PostRequestQueryParams>

###### description

get likes list of the mentioned post only from following accounts

---

###### URL

/entites/posts/{post-id}/comments

###### METHOD

POST

###### PARAMS

PostRequestQueryParams

###### BODY

TextRequestBodyParams

###### RESPONSE

ResponseBodyParams<CommentResponseParams, PostRequestQueryParams, TextRequestBodyParams>

###### description

post comment to the mentioned post

---

###### URL

/entites/posts/{post-id}/comments/{commen-id}/likes

###### METHOD

PUT

###### PARAMS

CommentRequestQueryParams

###### BODY

none

###### RESPONSE

ResponseBodyParams<none, CommentRequestQueryParams>

###### description

add like to the mentioned comment

---

###### URL

/entites/posts/{post-id}/comments/{commen-id}/pin

###### METHOD

PUT

##### PARAMS

CommentRequestQueryParams

###### BODY

none

###### RESPONSE

ResponseBodyParams<none, CommentRequestQueryParams>

###### description

pin the mentioned comment

---

###### URL

/entites/posts/{post-id}/comments/{commen-id}/report

###### METHOD

PUT

###### PARAMS

CommentRequestQueryParams

###### BODY

ReportRequestBodyParams

###### RESPONSE

ResponseBodyParams<none, CommentRequestQueryParams, ReportRequestBodyParams>

###### description

report the mentioned comment

---

###### URL

/entites/posts/{post-id}/comments/{commen-id}/delete

###### METHOD

DELETE

###### PARAMS

CommentRequestQueryParams

###### BODY

none

###### RESPONSE

ResponseBodyParams<none, CommentRequestQueryParams>

###### description

delete the mentioned comment

---

###### URL

/entites/posts/{post-id}/comments

###### METHOD

GET

###### PARAMS

PostRequestQueryParams

###### BODY

PageRequestBodyParams

###### RESPONSE

CommentPageResponseBodyParams

###### description

get comments for the mentioned post

---

###### URL

/entites/posts/{post-id}/comments/{comment-id}/replies

###### METHOD

POST

###### PARAMS

CommentRequestQueryParams

###### BODY

TextRequestBodyParams

###### RESPONSE

ResponseBodyParams<ReplyResponseParams, CommentRequestQueryParams, TextRequestBodyParams>

###### description

upload reply for the mentioned comment

---

###### URL

/entites/posts/{post-id}/comments/{comment-id}/replies/{reply-id}/likes

###### METHOD

PUT

###### PARAMS

ReplyRequestQueryParams

###### BODY

none

###### RESPONSE

ResponseBodyParams<none, ReplyRequestQueryParams>

###### description

like the mentioned reply

---

###### URL

/entites/posts/{post-id}/comments/{comment-id}/replies/{reply-id}/report

###### METHOD

PUT

###### PARAMS

ReplyRequestQueryParams

###### BODY

ReportRequestBodyParams

###### RESPONSE

ResponseBodyParams<none, ReplyRequestQueryParams, ReportRequestBodyParams>

###### description

report the mentioned reply

---

###### URL

/entites/posts/{post-id}/comments/{comment-id}/replies/{reply-id}/delete

###### METHOD

DELETE

###### PARAMS

ReplyRequestQueryParams

###### BODY

none

###### RESPONSE

ResponseBodyParams<none, ReplyRequestQueryParams>

###### description

delete the mentioned reply

---

###### URL

/entites/posts/{post-id}/save

###### METHOD

PUT

###### PARAMS

PostRequestQueryParams

###### BODY

none

###### RESPONSE

ResponseBodyParams<none, PostRequestQueryParams>

###### description

save the mentioned post

---

###### URL

/entites/posts/{post-id}/save/{collection-name}

###### METHOD

PUT

###### PARAMS

CollectionRequestQueryParams

###### BODY

none

###### RESPONSE

ResponseBodyParams<none, CollectionRequestQueryParams>

###### description

save the mentioned post to the mentioned collection

---

###### URL

/entites/posts/{post-id}

###### METHOD

GET

###### PARAMS

PostRequestQueryParams

###### BODY

none

###### RESPONSE

PostRouteResponseBodyParams

###### description

get details of the mentioned post

---

###### URL

/entites/hashtags/{name}

###### METHOD

GET

###### PARAMS

HashTagAndLocationRequestQueryParams

###### BODY

none

###### RESPONSE

HashTagRouteResponseBodyParams

###### description

get details of the mentioned hashtag

---

###### URL

/entites/hashtags/{name}/recent

###### METHOD

GET

###### PARAMS

HashTagAndLocationRequestQueryParams

###### BODY

PartialPageRequestBodyParams

###### RESPONSE

PostPageResponseBodyParams<HashTagAndLocationRequestQueryParams>

###### description

get recent posts of the mentioned hashtag

---

###### URL

/entites/hashtags/{name}/top

###### METHOD

GET

###### PARAMS

HashTagAndLocationRequestQueryParams

###### BODY

PartialPageRequestBodyParams

###### RESPONSE

PostPageResponseBodyParams<HashTagAndLocationRequestQueryParams>

###### description

get top posts of the mentioned hashtag

---

###### URL

/entites/locations/{name}

###### METHOD

GET

###### PARAMS

HashTagAndLocationRequestQueryParams

###### BODY

none

###### RESPONSE

LocationRouteResponseBodyParams

###### description

get details of the mentioned location

---

###### URL

/entites/locations/{name}/recent

###### METHOD

GET

###### PARAMS

HashTagAndLocationRequestQueryParams

###### BODY

PartialPageRequestBodyParams

###### RESPONSE

PostPageResponseBodyParams<HashTagAndLocationRequestQueryParams>

###### description

get recent posts of the mentioned location

---

###### URL

/entites/locations/{name}/top

###### METHOD

GET

###### PARAMS

HashTagAndLocationRequestQueryParams

###### BODY

PartialPageRequestBodyParams

###### RESPONSE

PostPageResponseBodyParams<HashTagAndLocationRequestQueryParams>

###### description

get top posts of the mentioned location

---

###### URL

/entites/locations/{name}/taggedaccounts

###### METHOD

GET

###### PARAMS

HashTagAndLocationRequestQueryParams

###### BODY

PartialPageRequestBodyParams

###### RESPONSE

AccountPageResponseBodyParams<HashTagAndLocationRequestQueryParams>

###### description

get tagged accounts of the mentioned location

---

###### URL

/entites/audios/{audio-id}

###### METHOD

GET

###### PARAMS

AudioRequestQueryParams

###### BODY

none

###### RESPONSE

AudioRouteResponseBodyParams

###### description

get details of the mentioned audio

---

###### URL

/entites/audios/{name}/photos

###### METHOD

GET

###### PARAMS

AudioRequestQueryParams

###### BODY

PartialPageRequestBodyParams

###### RESPONSE

PostPageResponseBodyParams<AudioRequestQueryParams>

###### description

get photo posts of the mentioned audio

---

###### URL

/entites/audios/{name}/moments

###### METHOD

GET

###### PARAMS

AudioRequestQueryParams

###### BODY

PartialPageRequestBodyParams

###### RESPONSE

PostPageResponseBodyParams<AudioRequestQueryParams>

###### description

get moment posts of the mentioned audio
