# api definitions for the backend

_base endpoint at http://localhost:port_

#### Explore Tab

###### URI

/explore

###### PARAMS

PostQueryParams

###### METHOD

GET

###### REQUEST BODY

PostPageRequestParams

###### RESPONSE BODY

PaginatedPostResponseBodyParams

###### INFO

returns popular posts specific to the users choice if postId param is not defined otherwise returns posts similar to the given post
