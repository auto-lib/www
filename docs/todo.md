# todo

these are the things planned for auto in the
coming months.

## python

this will be run on the backend.

## nsq

adding auto to the nsq messaging system
means you can connect auto objects
between processes (and presumably between
machines).

> this is a pubsub implementation.

there is also a websocket-nsq bridge being
developed that will allow you to connect
auto objects on the browser to ones on the
server. we could just do this with websocket
but if everything uses the same transport like
nsq then the browser can connect to an entire
ecosystem of machines (if those machines are
also all connecting using the same nsq pubsub).

## authentication

to use auto more universally we need a mechanism
for determining what values we can view, edit and
add to the pubsub.

> also a pubsub implementation

## autodom

this is in the works - perhaps a jsx transformer
that builds auto objects.

## input/output recording

using hooks we can record changes as they occur.
this allows us to check in future whether behavior
has changes (when implementation changes).

it would be good to have tools for this: diffs
on objects, front-ends to display these diffs
and also a backend-frontend that let's you
interact with objects via the front-end (perhaps
using autodom or a ui library like svelte).