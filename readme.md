##### discover tab : suggested accounts

###### URL

/discover/foryou

###### PARAMS

none

###### REQUEST BODY

PageRequestBodyParams

###### RESPONSE BODY

PaginatedAccountResponseBodyParams

###### description

account suggestion based on previous interactions like post interactions(suggests the author of those posts), following other accounts(suggests account that is followed by these account)

##### discover tab : popular accounts

###### URL

/discover/popular

###### PARAMS

none

###### REQUEST BODY

PageRequestBodyParams

###### RESPONSE BODY

PaginatedAccountResponseBodyParams

###### description

suggests popular accounts based on number of followers(upper and lower bounds may change with time)

##### discover tab : new accounts

###### URL

/discover/new

###### PARAMS

none

###### REQUEST BODY

PageRequestBodyParams

###### RESPONSE BODY

PaginatedAccountResponseBodyParams

###### description

suggests new accounts created in the app(lower bound of date created may change with time)

##### discover tab : nearby

###### URL

/discover/nearby

###### PARAMS

none

###### REQUEST BODY

PageRequestBodyParams

###### RESPONSE BODY

PaginatedAccountResponseBodyParams

###### description

suggests account that are nearby to the target device(radius of search may change with time)

##### foryou : photos

###### URL

/foryou/photos

###### PARAMS

none

###### REQUEST BODY

PageRequestBodyParams

###### RESPONSE BODY

PaginatedPostResponseBodyParams

###### description

suggests photos based on the users choice

##### foryou : videos

###### URL

/foryou/videos

###### PARAMS

none

###### REQUEST BODY

PageRequestBodyParams

###### RESPONSE BODY

PaginatedPostResponseBodyParams

###### description

suggests videos based on the users choice

##### foryou : moments

###### URL

/foryou/moments

###### PARAMS

none

###### REQUEST BODY

PageRequestBodyParams

###### RESPONSE BODY

PaginatedPostResponseBodyParams

###### description

suggests moments based on the users choice

##### search : general quick search

###### URL

/search

###### PARAMS

none

###### REQUEST BODY

SearchRequestBodyParams

###### RESPONSE BODY

SearchResponseBodyParams

###### description

returns a quick search results of popular search phases and entities(account, hashtag, location, audio)

##### search : posts

###### URL

/search/posts

###### PARAMS

none

###### REQUEST BODY

SearchRequestPageBodyParams

###### RESPONSE BODY

PaginatedPostSearchResponseBodyParams

###### description

returns post search results based on search phase(searchable parameters are caption and location)

##### search : account search

###### URL

/search/accounts

###### PARAMS

none

###### REQUEST BODY

SearchRequestBodyParams

###### RESPONSE BODY

SearchResponseBodyParams

###### description

returns account search results

##### search : audio search

###### URL

/search/audio

###### PARAMS

none

###### REQUEST BODY

SearchRequestBodyParams

###### RESPONSE BODY

SearchResponseBodyParams

###### description

returns audio search results

##### search : hashtag search

###### URL

/search/hashtag

###### PARAMS

none

###### REQUEST BODY

SearchRequestBodyParams

###### RESPONSE BODY

SearchResponseBodyParams

###### description

returns location search results

##### search : locations search

###### URL

/search/locations

###### PARAMS

none

###### REQUEST BODY

SearchRequestBodyParams

###### RESPONSE BODY

SearchResponseBodyParams

###### description

returns location search results

##### explore : explore popular posts

###### URL

/explore

###### PARAMS

none

###### REQUEST BODY

PageRequestBodyParams

###### RESPONSE BODY

PaginatedPostResponseBodyParams

###### description

returns popular posts based on users choice

##### explore : popular photos

###### URL

/explore/{post-id}/photos

###### PARAMS

PostQueryParams

###### REQUEST BODY

PageRequestBodyParams

###### RESPONSE BODY

PaginatedPostResponseBodyParams

###### description

returns popular photos based on a target post

##### explore : popular videos

###### URL

/explore/{post-id}/videos

###### PARAMS

PostQueryParams

###### REQUEST BODY

PageRequestBodyParams

###### RESPONSE BODY

PaginatedPostResponseBodyParams

###### description

returns popular videos based on a target post

##### explore : popular moments

###### URL

/explore/{post-id}/moments

###### PARAMS

PostQueryParams

###### REQUEST BODY

PageRequestBodyParams

###### RESPONSE BODY

PaginatedPostResponseBodyParams

###### description

returns popular moments based on a target post

##### following

###### URL

/following

###### PARAMS

none

###### REQUEST BODY

none

###### RESPONSE BODY

HomeFeedResponseBodyParams

###### description

returns first batch of memory and posts from following accounts, recent searches and some account suggestions

##### following posts

###### URL

/following/posts

###### PARAMS

none

###### REQUEST BODY

PageRequestBodyParams

###### RESPONSE BODY

PaginatedPostResponseBodyParams

###### description

returns posts from following accounts

##### following memories

###### URL

/following/memories

###### PARAMS

none

###### REQUEST BODY

PageRequestBodyParams

###### RESPONSE BODY

PaginatedAccountResponseBodyParams

###### description

returns memory informations of following accounts(if total number of memories does not exceeds threshold it will be attached to the accounts)

##### post like route

###### URL

/posts/{post-id}/likes

###### METHOD

PUT

###### REQUEST BODY

none

###### RESPONSE BODY

ResponseBodyParams<never, PostRequestQueryParams>

###### description

likes the mentioned post from requesting account

---

###### URL

/posts/{post-id}/likes

###### METHOD

GET

###### REQUEST BODY

Partial<SearchRequestBodyParams>

###### RESPONSE BODY

AccountListResponseBodyParams<PostRequestQueryParams & SearchRequestBodyParams>

###### description

get likes list of the mentioned post with an optional search query string as filter

---

###### URL

/posts/{post-id}/likes/followings

###### METHOD

GET

###### REQUEST BODY

none

###### RESPONSE BODY

AccountPageResponseBodyParams<PostRequestQueryParams>

###### description

get likes list of the mentioned post only from following accounts

---

###### URL

/posts/{post-id}/comments

###### METHOD

POST

###### REQUEST BODY

TextRequestBodyParams

###### RESPONSE BODY

ResponseBodyParams<CommentResponseParams, PostRequestQueryParams & TextRequestBodyParams>

###### description

post comment to the mentioned post

---

###### URL

/posts/{post-id}/comments/{commen-id}/likes

###### METHOD

PUT

###### REQUEST BODY

none

###### RESPONSE BODY

ResponseBodyParams<none, CommentRequestQueryParams>

###### description

add like to the mentioned comment

---

###### URL

/posts/{post-id}/comments/{commen-id}/pin

###### METHOD

PUT

###### REQUEST BODY

none

###### RESPONSE BODY

ResponseBodyParams<none, CommentRequestQueryParams>

###### description

pin the mentioned comment

---

###### URL

/posts/{post-id}/comments/{commen-id}/report

###### METHOD

PUT

###### REQUEST BODY

none

###### RESPONSE BODY

ResponseBodyParams<none, CommentRequestQueryParams>

###### description

report the mentioned comment

---

###### URL

/posts/{post-id}/comments/{commen-id}/delete

###### METHOD

DELETE

###### REQUEST BODY

none

###### RESPONSE BODY

ResponseBodyParams<none, CommentRequestQueryParams>

###### description

delete the mentioned comment

---

###### URL

/posts/{post-id}/comments

###### METHOD

GET

###### REQUEST BODY

PageRequestBodyParams | undefined

###### RESPONSE BODY

CommentPageResponseBodyParams

###### description

get comments for the mentioned post

---

###### URL

/posts/{post-id}/comments/{comment-id}/replies

###### METHOD

POST

###### REQUEST BODY

TextRequestBodyParams

###### RESPONSE BODY

ResponseBodyParams<ReplyResponseParams, CommentRequestQueryParams & TextRequestBodyParams>

###### description

upload reply for the mentioned comment

---

###### URL

/posts/{post-id}/comments/{comment-id}/replies/{reply-id}/likes

###### METHOD

PUT

###### REQUEST BODY

none

###### RESPONSE BODY

ResponseBodyParams<none, ReplyRequestQueryParams>

###### description

like the mentioned reply

---

###### URL

/posts/{post-id}/comments/{comment-id}/replies/{reply-id}/report

###### METHOD

PUT

###### REQUEST BODY

none

###### RESPONSE BODY

ResponseBodyParams<none, ReplyRequestQueryParams>

###### description

report the mentioned reply

---

###### URL

/posts/{post-id}/comments/{comment-id}/replies/{reply-id}/delete

###### METHOD

DELETE

###### REQUEST BODY

none

###### RESPONSE BODY

ResponseBodyParams<none, ReplyRequestQueryParams>

###### description

delete the mentioned reply

---

###### URL

/posts/{post-id}/save

###### METHOD

PUT

###### REQUEST BODY

none

###### RESPONSE BODY

ResponseBodyParams<none, PostRequestQueryParams>

###### description

save the mentioned post

---

###### URL

/posts/{post-id}/save/{folder-name}

###### METHOD

PUT

###### REQUEST BODY

none

###### RESPONSE BODY

ResponseBodyParams<none, PostRequestQueryParams & FolderParams>

###### description

save the mentioned post to the mentioned folder

---

###### URL

/posts/{post-id}/add/{folder-name}

###### METHOD

PUT

###### REQUEST BODY

none

###### RESPONSE BODY

ResponseBodyParams<none, PostRequestQueryParams & FolderParams>

###### description

add the mentioned post to the mentioned folder

---

###### URL

/posts/{post-id}

###### METHOD

GET

###### REQUEST BODY

none

###### RESPONSE BODY

PostRouteResponseBodyParams

###### description

get details of the mentioned post
