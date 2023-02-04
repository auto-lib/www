
# python side-by-side walkthrough

let's produce a python script for a typical
maintanence task two ways,
using traditional imperative style and using pyauto,
and compare them.

## scenario

_scan a database everyday for certain fields / conditions_
_do some processing on these (perhaps also connecting_
_to the database for sub queries) and then updating_
_the database with the result_

in our particular case we will be scanning a wordpress database
looking for urls in the posts, do some processing
on the urls (perhaps converting them somehow),
and then updating them on the db.

## multi-stage caching

to make this script robust
we also want to be idempotent so you can
run, interrupt and re-run the script and it will
carry on from where it left off. this means each stage
will be cached on the filesystem in the `data/` directory.

1. scan database for fields
2. process fields, also using database
3. 