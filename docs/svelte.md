# using auto with svelte

svelte was the first ui to be used with auto.
there are some boilerplate repos for this:

https://github.com/auto-lib/auto-example-svelte
https://github.com/auto-lib/auto-example-svelte-tailwind

note that in each the readme includes a walkthrough
of how they were created from scratch.

## how to do it

you create your state object, e.g. in `state.js` put

```js
import auto from '@autolib/auto';

let _ = auto({

	first_name: 'Jim',
	last_name: 'Cricket',
	name: (_) => _.first_name + ' ' + _.last_name
})

export default _;
```

then you import it and use the `#` object on the
returned auto object to get every subscribable
object

> auto creates subscribable versions of each of
> the object variables (svelte-store compatible)
> and lets you reference them using `#`

so for example `App.svelte` might look like

```js
<script>
	import _ from './state.js';
	let { name } = _['#'];
</script>

<p>Hello {$name}</p>
```

## using context (multiple apps)

svelte lets you save variables globally using
a key. so we could save the state like so

```js
import { setContext } from 'svelte';

// get key
// get state

setContext(key, state);
```

then in other components we can retrieve
our state variables like so

```js
<script>
    import { getContext } from 'svelte';

    // get key

    const { name } = getContext(key)['#'];
</script>

<p>Hello {$name}</p>
```

why would we do it like that?

well primarily if you want to create
multiple instances of your svelte app
on the same page - using a key let's
you have one state object per app
instance.

> i'm not 100% sure why various svelte
> instances clash when you create them
> using `main.js` ...

note, though, that you must
have a unique key for each app. to do
this into something like `key.js`:

```js
const contextKey = {}
export default contextKey // unique for some reason
```

then use it like so in `App.svelte`

```js
import key from './key.js';
setContext(key,state);
```

then you have to import the key in each
component

```js
import key from './key.js';
const { name } = getContext(key)['#'];
```

not sure how it works but `contextKey` in
`key.js` is a new object so it has a unique
address each time you import it?
but it does in fact work.