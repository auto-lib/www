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

## checks (types)

something interesting to look at is using a
naming convention to specify a set of checks
that have to be passed before we save a value.

> we could do this by wrapping _cache_ but how
> do we prevent knock-on?

```js
auto({
    'x:int': 10,
    'y:str': _ => _.x + ' times'
})
```

checks can just be a function

```js
let int = val => typeof val == 'integer'
```

interestingly, though, this is deeper than
types: we could have something like

```js
auto({
    'x:int<10': 4,
    'y:len()<3': _ => _.x + 'km'
})
```

> i think it's fascinating that all types
> are encapsulated by a single boolean function,
> but said function is _more_ powerful - you
> could check a value against another!

```js
auto({
    'x:int': 4,
    'y:int>x': 10
})
```

i haven't really needed this in my own work,
though, which makes me wonder whether it really
is useful.

also, if we do implement it having a vs code
editor that picks these up will be essential -
we want to be able to see problems as we write
them, not during runtime.

it might be better to have a separate object
that just defines a function for each variable.
that way we don't need a complicated format
determining the logic:

```js
let checks = {
    x: v => _ => typeof v === 'integer',
    y: v => - => typeof v === 'integer' && v > _.x
}
```

## fuzzing

another testing technique, might be good to
have a set of values each input can take,
perhaps by returning a function like `random(seed)`
for each 'type' (really a _check_) that gives
a potential value (e.g. `20` if we have an int)
so that we can feed in various inputs, in various orders,
and see if we can break the program (and then
the types will be worth having ... because they'll
catch problems during random inputs).